# 22. Context API를 사용한 전역 값 관리

Context API는 프로젝트에서 전역적으로 사용할 값을 관리할 수 있게 해주는 기능. props를 여러 컴포넌트를 거쳐 전달하는 구조를 해결할 수 있음

## Context 생성 및 사용

```jsx
// Context 생성
const UserDispatch = React.createContext(null);

// Context Provider로 감싸기
<UserDispatch.Provider value={dispatch}>
  <Component />
</UserDispatch.Provider>;

// 다른 컴포넌트에서 사용
import { UserDispatch } from "./App";
const dispatch = useContext(UserDispatch);
```

## 예시: User 컴포넌트에서 Context 사용하기

```jsx
import React, { useContext } from "react";
import { UserDispatch } from "./App";

const User = React.memo(function User({ user }) {
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => {
          dispatch({ type: "TOGGLE_USER", id: user.id });
        }}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button
        onClick={() => {
          dispatch({ type: "REMOVE_USER", id: user.id });
        }}
      >
        삭제
      </button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

## 예시: CreateUser 컴포넌트에서 Context 사용하기

```jsx
import React, { useRef, useContext } from "react";
import useInputs from "./hooks/useInputs";
import { UserDispatch } from "./App";

const CreateUser = () => {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  const nextId = useRef(4);
  const dispatch = useContext(UserDispatch);

  const onCreate = () => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  };

  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser);
```

장점:

- 컴포넌트 간 props 전달을 줄일 수 있음
- 전역적으로 상태나 함수를 관리할 수 있음
- 컴포넌트 구조가 깔끔해짐
