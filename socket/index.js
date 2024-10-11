const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { availableParallelism } = require('node:os');
const cluster = require('node:cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  // 사용 가능한 코어당 하나의 작업자 생성
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({
      PORT: 3000 + i
    });
  }
  
  // 기본 스레드에 어댑터 설정
  return setupPrimary();
}

async function main() {

  // 데이터베이스 파일 열기
  const db = await open({
    filename: "chat.db",
    driver: sqlite3.Database,
  });

  // 'messages' 테이블 만들기
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEXT UNIQUE,
        content TEXT
    );
  `);

  // Express 애플리케이션과 HTTP 서버 초기화
  const app = express();
  const server = createServer(app);

  // Socket.IO 서버 초기화 및 연결 상태 복구 기능 활성화
  const io = new Server(server, {
    connectionStateRecovery: {}, // 클라이언트의 방 참여 상태 및 놓친 이벤트 복원
    // 각 작업자 스레드에 어댑터 설정
    adapter: createAdapter()
  });

  app.get("/", (req, res) => {
    // 웹사이트 홈('/') 경로에 대한 GET 요청 처리기 정의
    // 서버의 파일 시스템에서 index.html 파일의 경로를 결정하고, 파일을 클라이언트에 전송
    res.sendFile(join(__dirname, "index.html"));
  });

  io.on("connection", async (socket) => {
    // 주의 : 이벤트 확인 안 하면 클라이언트가 계속 재시도
    socket.on("채팅 메세지", async (msg, clientOffset, callback) => {
      let result;
      try {
        // 메시지를 데이터베이스에 저장
        result = await db.run(
          "INSERT INTO messages (content, client_offset) VALUES (?, ?)",
          msg,
          clientOffset
        );
      } catch (e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
          // 메시지가 이미 삽입된 경우, 클라이언트에게 알림
          callback();
        } else {
          // 아무 작업도 하지 않고, 클라이언트가 다시 시도하도록 둠
        }
        return;
      }
      io.emit("채팅 메세지", msg, result.lastID); // 메시지에 오프셋 포함
      // 이벤트 확인
      callback();
    });

    if (!socket.recovered) {
      // 연결 상태 복구에 성공하지 못한 경우
      try {
        await db.each(
          "SELECT id, content FROM messages WHERE id > ?",
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            socket.emit("채팅 메세지", row.content, row.id);
          }
        );
      } catch (e) {
        // 뭔가 잘못됨
      }
    }
  });

  // 각 작업자는 고유한 포트에서 청취
  const port = process.env.PORT;

  server.listen(port, () => {
    console.log(`실행 중인 서버 : http://localhost:${port}`); // HTTP 서버가 포트 3000에서 요청을 수신하도록 설정
  });
}

main();
