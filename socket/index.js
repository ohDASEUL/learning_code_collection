const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

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
  });

  app.get("/", (req, res) => {
    // 웹사이트 홈('/') 경로에 대한 GET 요청 처리기 정의
    // 서버의 파일 시스템에서 index.html 파일의 경로를 결정하고, 파일을 클라이언트에 전송
    res.sendFile(join(__dirname, "index.html"));
  });

  io.on("connection", async (socket) => {
    socket.on("채팅 메세지", async (msg) => {
      let result;
      try {
        // 메시지를 데이터베이스에 저장
        result = await db.run("INSERT INTO messages (content) VALUES (?)", msg);
      } catch (e) {
         // TODO가 실패를 처리
        return;
      }
      io.emit("채팅 메세지", msg, result.lastID); // 메시지에 오프셋 포함
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

  server.listen(3000, () => {
    console.log("실행 중인 서버 : http://localhost:3000"); // HTTP 서버가 포트 3000에서 요청을 수신하도록 설정
  });
}

main();
