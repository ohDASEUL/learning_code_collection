// useInputs 커스텀 Hook 을 useReducer 를 사용해서 구현하기
// 작성한 코드

// 1. reducer 함수는 훅 외부에 위치
import { useCallback, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_VALUE":
      // action.form을 받아서 새로운 상태로 반환
      return action.form;
    case "RESET_VALUE":
      // initialForm으로 상태를 리셋
      return action.initialForm;
    default:
      return state;
  }
}

export default function useInputs(initialForm) {
  // 2. useReducer 사용
  const [state, dispatch] = useReducer(reducer, initialForm);

  // 3. onChange와 reset 함수 정의
  const onChange = useCallback(
    (e) => {
      // e.target에서 name과 value를 추출
      const { name, value } = e.target;
      // dispatch 사용
      dispatch({
        type: "CHANGE_VALUE",
        form: { ...state, [name]: value },
      });
    },
    [state]
  );

  const reset = useCallback(() => {
    // dispatch 사용
    dispatch({
      type: "RESET_VALUE",
      initialForm, // initialForm을 액션에 전달
    });
  }, [initialForm]);
  return [state, onChange, reset];
}
