# useRef로 특정 DOM 선택하기

## 1. DOM 선택의 필요성

### JS VS React

- JavaScript: getElementById, querySelector 등의 DOM Selector 함수 사용
- React: `useRef` Hook 사용

### DOM 선택이 필요한 상황

- 특정 엘리먼트의 크기 측정
- 스크롤바 위치 제어
- 포커스 설정
- 외부 라이브러리 (그래프, 비디오 플레이어 등) 사용

## 2. useRef 사용하기

### 기본 사용법

```js
import React, { useState, useRef } from "react";

function InputSample() {
  const nameInput = useRef(); // Ref 객체 생성

  // nameInput.current로 DOM 접근
  const focusInput = () => {
    nameInput.current.focus();
  };

  return (
    <input ref={nameInput} /> // DOM에 Ref 연결
  );
}
```

### 실제 구현

```js
import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus(); // 초기화 후 포커스 설정
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

## 3. 주요 개념

### Ref 객체

- useRef()로 생성
- .current 속성을 통해 실제 DOM 접근
- 컴포넌트 전 생애주기 동안 유지되는 값
