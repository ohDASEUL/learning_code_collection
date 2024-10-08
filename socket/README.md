# socket.io 기본 채팅 앱

> npm install express@4
> node index.js
> npm install socket.io

---

# Socket.IO 이벤트 및 방송 기능

Socket.IO를 사용하여 서버와 클라이언트 간의 다양한 이벤트 및 방송 기능을 구현하는 방법

## 기본 연결 및 연결 해제 이벤트

```javascript
// 클라이언트가 소켓 서버에 연결될 때 실행되는 이벤트
io.on("connection", (socket) => {
  console.log("a user connected");

  // 클라이언트 연결이 해제될 때 실행되는 이벤트
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
```

## 전체 소켓에 이벤트 방송

```javascript
// 연결된 모든 클라이언트에게 'hello', 'world' 메시지를 전송
io.emit("hello", "world");
```

## 특정 소켓을 제외하고 이벤트 방송

```javascript
// 연결된 현재 클라이언트를 제외하고 모든 클라이언트에게 'hi' 메시지를 전송
io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});
```

## 단순 메시지 방송

```javascript
// 발신자를 포함한 모든 클라이언트에게 'chat message' 이벤트와 메시지 전송
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
```

- 이 설명은 Socket.IO 사용해서 서버랑 클라이언트 사이에서 여러 가지 통신 방법 보여줌.
- 클라이언트가 서버에 연결되거나 끊길 때 기본 이벤트 처리하는 방법이랑, 메시지 방송하는 방법 다룸.
- 실시간 어플리케이션에서 데이터 효과적으로 주고받을 수 있음

---

# Socket.IO API

Socket.IO는 실시간 양방향 이벤트 기반 통신을 가능하게 하는 JavaScript 라이브러리

## 클라이언트와 서버 간의 기본적인 통신 방법과 API 사용법

### 클라이언트에서 서버로 메시지 보내기

```javascript
// 클라이언트 코드
socket.emit("hello", "world");
// 서버 코드
io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); // 'world'
  });
});
```

### 서버에서 클라이언트로 메시지 보내기

```javascript
// 서버 코드
io.on("connection", (socket) => {
  socket.emit("hello", "world");
});
// 클라이언트 코드
socket.on("hello", (arg) => {
  console.log(arg); // 'world'
});
```

## 데이터 전송

인수를 여러 개 보낼 수 있으며, ArrayBuffer, TypedArray 또는 Node.js의 Buffer와 같은 이진 객체를 포함한 모든 직렬화 가능한 데이터 구조를 지원

### 클라이언트에서 서버로 복잡한 데이터 보내기

```javascript
// 클라이언트 코드
socket.emit("hello", 1, "2", { 3: "4", 5: Uint8Array.from([6]) });
// 서버 코드
io.on("connection", (socket) => {
  socket.on("hello", (arg1, arg2, arg3) => {
    console.log(arg1); // 1
    console.log(arg2); // '2'
    console.log(arg3); // { 3: '4', 5: <Buffer 06> }
  });
});
```

### 서버에서 클라이언트로 복잡한 데이터 보내기

```javascript
// 서버 코드
io.on("connection", (socket) => {
  socket.emit("hello", 1, "2", { 3: "4", 5: Buffer.from([6]) });
});
// 클라이언트 코드
socket.on("hello", (arg1, arg2, arg3) => {
  console.log(arg1); // 1
  console.log(arg2); // '2'
  console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }
});
```

## Acknowledgements(응답 확인)

### 클라이언트에서 서버로 요청 및 응답 처리

```javascript
// 클라이언트 코드
socket.timeout(5000).emit("request", { foo: "bar" }, "baz", (err, response) => {
  if (err) {
    // 에러 처리
  } else {
    console.log(response.status); // 'ok'
  }
});
// 서버 코드
io.on("connection", (socket) => {
  socket.on("request", (arg1, arg2, callback) => {
    console.log(arg1); // { foo: 'bar' }
    console.log(arg2); // 'baz'
    callback({
      status: "ok",
    });
  });
});
```

## 방송과 방 (Broadcasting and Rooms)

```javascript
// 서버 코드
io.on("connection", (socket) => {
  // 클라이언트가 'some room' 방에 참여
  socket.join("some room");

  // 'some room' 방에 있는 모든 클라이언트에게 메시지 전송
  io.to("some room").emit("hello", "world");

  // 'some room' 방을 제외한 모든 클라이언트에게 메시지 전송
  io.except("some room").emit("hello", "world");

  // 클라이언트가 'some room' 방을 떠남
  socket.leave("some room");
});
```

![rooms](https://socket.io/images/tutorial/room-dark.png)

- Socket.IO의 기본적인 사용 방법을 다루며, 다양한 API 기능을 이해하는 데 도움이 됨
