// express 모듈을 불러옵니다.
const express = require('express');
// node의 HTTP 모듈에서 createServer 메소드 불러오기
const { createServer } = require('node:http');
// node의 path 모듈에서 join 메소드 불러오기
const { join } = require('node:path');
// socket.io 모듈에서 Server 클래스 불러오기
const { Server } = require('socket.io');

// express 애플리케이션 인스턴스를 생성
const app = express();
// express 애플리케이션을 기반으로 HTTP 서버를 생성
const server = createServer(app); // 앱을 http 서버로 초기화
// 생성된 HTTP 서버를 기반으로 소켓 서버 인스턴스 생성
const io = new Server(server);

app.get('/', (req, res) => { // 웹사이트 홈('/') 경로에 대한 GET 요청 처리기 정의
    // 서버의 파일 시스템에서 index.html 파일의 경로를 결정하고, 파일을 클라이언트에 전송
    res.sendFile(join(__dirname, 'index.html')); // 클라이언트에 'index.html' 파일을 응답으로 보냄
});

// 소켓 서버에 클라이언트가 연결될 때
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

io.on('connection', (socket) => {
  // // 클라이언트로부터 'chat message' 이벤트가 수신될 때 실행
  socket.on('chat message', (msg) => {
    // / 서버 콘솔에 수신된 메시지를 출력
    console.log('message: ' + msg);
  });
});

// 서버를 포트 3000에서 실행하도록 설정하고, 서버 시작 시 콘솔에 메시지 출력
server.listen(3000, () => { // HTTP 서버가 포트 3000에서 요청을 수신하도록 설정
  console.log('server running at http://localhost:3000'); // 서버 시작 시 콘솔에 메시지 출력
});
