# 12. useRef로 컴포넌트 안의 변수 만들기

## useRef의 주요 특징

- DOM 선택 및 컴포넌트 내 변수 관리
- 값 변경 시 리렌더링 발생하지 않음
- 즉시 값 조회 가능

## useRef 활용 사례

- setTimeout/setInterval ID 관리
- 외부 라이브러리 인스턴스 관리
- scroll 위치 관리

## 컴포넌트 구현 예시

```jsx
import React from "react";

import UserList from "./UserList";

function App() {
  const users = [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ];
  return <UserList users={users} />;
}

export default App;
```

```jsx
import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
```

## useRef 실제 사용 예시

```jsx
import React, { useRef } from "react";
import UserList from "./UserList";

function App() {
  const users = [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ];

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    nextId.current += 1;
  };
  return <UserList users={users} />;
}

export default App;
```

## useRef 사용법

- 초기값: useRef(파라미터)로 설정
- 값 수정: .current로 접근하여 수정
- 값 조회: .current로 접근
