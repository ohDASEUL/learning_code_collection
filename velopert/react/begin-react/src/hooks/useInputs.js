import { useReducer, useCallback } from "react";

// reducer 함수: 상태 업데이트 로직을 담당
function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      // 입력 값이 변경될 때 실행
      // 기존 state를 복사하고 변경된 필드만 업데이트
      return {
        ...state,
        [action.name]: action.value,
      };

    case "RESET":
      // 모든 입력 필드를 초기화
      // Object.keys로 모든 필드를 추출하고 reduce로 빈 문자열로 초기화
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = "";
        return acc;
      }, {});

    default:
      return state;
  }
}

function useInputs(initialForm) {
  // form: 현재 입력 필드들의 상태
  // dispatch: 상태 업데이트를 위한 함수
  const [form, dispatch] = useReducer(reducer, initialForm);

  // input 변경 핸들러
  // useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  }, []); // 의존성 배열이 비어있음 - 컴포넌트 생성시 한 번만 생성

  // 입력 필드 초기화 함수
  // useCallback으로 메모이제이션
  const reset = useCallback(() => dispatch({ type: "RESET" }), []); // 의존성 배열이 비어있음 - 컴포넌트 생성시 한 번만 생성

  // form(현재 상태), onChange(변경 핸들러), reset(초기화 함수) 반환
  return [form, onChange, reset];
}

export default useInputs;
