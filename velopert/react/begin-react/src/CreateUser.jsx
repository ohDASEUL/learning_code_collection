import useInputs from "@hooks/useInputs";
import { UserDispatch } from "./App";
import React, { useCallback, useContext, useRef } from "react";

// 숙제 : CreateUser 컴포넌트에서도 dispatch 를 직접 하도록 구현
// CreateUser 에게는 아무 props 도 전달하지 말기
// CreateUser 컴포넌트 내부에서 useInputs 를 사용하기
// useRef 를 사용한 nextId 값을 CreateUser 에서 관리하기

// 작성한 코드
const CreateUser = () => {
  const dispatch = useContext(UserDispatch);

  const [{ username, email }, onChange, onReset] = useInputs({
    username: "",
    email: "",
  });

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    onReset();
    nextId.current += 1;
  }, [username, email, onReset]);

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
