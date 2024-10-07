const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const app = express();
const server = createServer(app); // 앱을 http 서버로 초기화

app.get('/', (req, res) => { // 웹사이트 홈('/') 경로에 대한 GET 요청 처리기 정의
    res.sendFile(join(__dirname, 'index.html')); // 클라이언트에 'index.html' 파일을 응답으로 보냄
});

server.listen(3000, () => { // HTTP 서버가 포트 3000에서 요청을 수신하도록 설정
  console.log('server running at http://localhost:3000'); // 서버 시작 시 콘솔에 메시지 출력
});
