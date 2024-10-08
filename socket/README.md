# socket.io 기본 채팅 앱

> npm install express@4

> npm install socket.io

> node index.js

---

# Socket.IO 이벤트(Event) 및 방송(Broadcast) 기능

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
- 클라이언트가 서버에 연결되거나 끊길 때 기본 이벤트 처리하는 방법이랑, 메시지 방송하는 방법을 다룸.
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

# Socket.IO에서 연결 해제 처리하기

Socket.IO를 사용할 때, 클라이언트의 연결 해제를 효과적으로 관리하는 것이 중요한데 이는 클라이언트가 의도적으로 또는 네트워크 문제로 인해 연결이 끊어질 수 있기 때문.

## 연결 해제 감지하기

클라이언트의 연결 해제를 감지하려면 `disconnect` 이벤트를 사용함.

이 이벤트는 클라이언트 연결이 끊어졌을 때 서버에 의해 자동으로 발생.

```javascript
// 클라이언트가 소켓 서버에 연결될 때 실행되는 이벤트 핸들러
io.on("connection", (socket) => {
  // 클라이언트 연결이 해제될 때 실행되는 이벤트 핸들러
  socket.on("disconnect", (reason) => {
    // 연결 해제 이유를 콘솔에 로그
    console.log(`Client disconnected: ${reason}`);
  });
});
```

위 코드는 클라이언트가 연결을 끊었을 때 그 이유를 콘솔에 출력함.

`reason` 매개변수는 연결 해제의 원인을 제공하며 다음과 같은 값일 수 있음:

- `transport close`: 클라이언트가 연결을 명시적으로 닫았을 때
- `ping timeout`: 서버로부터의 핑 메시지에 클라이언트가 시간 내에 응답하지 않았을 때
- `transport error`: 네트워크 오류 또는 서버 오류가 발생했을 때

## 재연결 옵션 구성하기

클라이언트가 자동으로 재연결을 시도할 수 있도록 구성하는 것은 애플리케이션의 안정성을 보장하기 위해 중요함

Socket.IO 클라이언트 라이브러리는 재연결을 위한 여러 옵션을 제공함

```javascript
// Socket.IO 클라이언트 설정
const socket = io({
  reconnection: true, // 재연결을 활성화
  reconnectionAttempts: 5, // 최대 재연결 시도 횟수
  reconnectionDelay: 500, // 재연결 시도 간의 지연 시간 (밀리초)
  reconnectionDelayMax: 1000, // 최대 재연결 지연 시간
  randomizationFactor: 0.5, // 재연결 지연 시간에 적용되는 무작위 요소
});
```

이 설정들은 클라이언트가 연결이 끊어진 후 서버에 재연결을 시도하는 방법을 제어함.

이를 통해 네트워크 문제가 발생하거나 사용자가 의도적으로 연결을 끊었을 때도 어플리케이션의 연결 상태를 유지할 수 있음

![Handling_disconnections](https://socket.io/images/tutorial/disconnected-dark.png)


### Connection State Recovery 기능 설명

- **기능 개요**: 이 기능은 클라이언트의 연결 상태를 임시로 저장하고, 재연결 시 이 상태를 복원
  - 클라이언트가 다시 연결될 때 이전에 참여했던 방을 복원
  - 놓친 이벤트들을 클라이언트에게 전송
- **제한 사항**:
  - 서버가 갑자기 충돌하거나 재시작되는 경우, 클라이언트 상태가 저장되지 않을 수 있어 항상 작동하지 않을 수 있음
  - 시스템을 확장하는 과정에서 이 기능을 활성화하는 것이 항상 가능한 건 아님.
- **장점**:
  - 사용자가 WiFi에서 4G로 전환하는 등의 일시적인 연결 끊김 후에도 클라이언트 상태를 동기화할 필요가 없고, 이로 인해 사용자 경험을 크게 향상시킬 수 있음

이 기능은 특히 모바일 사용자에게 유용하며, 네트워크 상태의 변화가 잦은 환경에서 더욱 빛을 발휘함.
  