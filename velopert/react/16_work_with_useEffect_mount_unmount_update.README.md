# 16. useEffect를 사용하여 마운트 / 언마운트 / 업데이트 시 할 작업 설정하기

## 마운트 / 언 마운트

```jsx
import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
```

- useEffect 사용 시 첫 번째 파라미터는 함수, 두 번째 파라미터는 의존값이 들어있는 배열(deps) 삽입
- 만약에 deps 배열을 비운다면, 컴포넌트가 처음 나타날 때만 useEffect에 등록한 함수가 호출됨
- cleanup : useEffect에서는 반환하는 함수로 useEffect에 대한 뒷정리를 해줌.
- deps가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출 됨.

### 마운트 시 하는 작업

- props 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

### 언마운트 시 하는 작업

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

## deps 에 특정 값 넣기

- deps에 특정 값을 넣게된다면, 컴포넌트가 처음 마운트 될 때에도 호출 되고, 지정한 값이 바뀔 때에도 호출됨.
- deps 안에 특정 값이 있다면 언마운트 시에도 호출이 되고, 값이 바뀌기 직전에도 호출됨.

```jsx
import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log("user 값이 설정됨");
    console.log(user);
    return () => {
      console.log("user 가 바뀌기 전..");
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
```

- useEffect 안에서 사용하는 상태나, props가 있다면, useEffect의 deps에 넣어줘야 함.
- 만약 useEffect 안에서 사용하는 상태나 props를 deps에 넣지 않게 된다면 useEffect에 등록한 함수 실행 시 최신 props 상태를 가르키지 않게 됨.

## deps 파라미터를 생략하기

- deps 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출이 됨.

```jsx
import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log(user);
  });
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
```

- 리액트 컴포넌트는 기본적으로 부모 컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링
- 실제 DOM에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당.
- Virtual DOM에는 모든 걸 다 렌더링
