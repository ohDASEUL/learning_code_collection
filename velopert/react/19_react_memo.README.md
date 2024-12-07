# 19. React.memo를 사용한 컴포넌트 리렌더링 방지

React.memo는 컴포넌트의 불필요한 리렌더링을 방지하는 성능 최적화 도구. 하지만 아래와 같은 문제점과 해결책을 이해하고 적절히 사용해야 함:

1. 문제점: React.memo만으로는 props로 전달되는 함수들(onCreate, onToggle, onRemove 등)이 매번 새로 생성되어 여전히 불필요한 리렌더링이 발생할 수 있음

2. 해결책: useCallback을 함께 사용하여 함수의 재생성을 방지하고, 필요한 경우 함수형 업데이트를 활용하여 의존성 배열을 최소화함

```jsx
import React from "react";

const CreateUser = ({ username, email, onChange, onCreate }) => {
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

```jsx
import React from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
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
});

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

export default React.memo(UserList);
```

```jsx
import React, { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({ username: "", email: "" });
  const { username, email } = inputs;
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    { id: 2, username: "tester", email: "tester@example.com", active: false },
    { id: 3, username: "liz", email: "liz@example.com", active: false },
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = { id: nextId.current, username, email };
    setUsers((users) => users.concat(user));
    setInputs({ username: "", email: "" });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

주의사항:

- React.memo와 useCallback은 실제로 성능 최적화가 필요한 경우에만 사용할 것
- 불필요한 사용은 오히려 성능을 저하시킬 수 있음
- 함수형 업데이트를 활용하면 useCallback의 의존성 배열을 최소화할 수 있음
