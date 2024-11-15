# React useRef 핵심 가이드

## useRef란?

- React에서 DOM을 직접 선택할 때 사용하는 Hook
- vanilla JS의 getElementById, querySelector 등을 대체
- 컴포넌트의 생애주기 동안 유지되는 값을 저장

## 1. DOM 선택이 필요한 경우

- 특정 요소 크기나 위치 측정 필요할 때
- 스크롤 위치 제어할 때
- 포커스 설정이 필요할 때
- 외부 라이브러리(차트, 영상) 적용할 때

## 2. 기본 사용법

### 간단한 예제

```js
import React, { useRef } from "react";

function InputExample() {
  // 1. useRef로 ref 객체 생성
  const inputRef = useRef();

  const focusInput = () => {
    // 3. .current로 DOM에 접근
    inputRef.current.focus();
  };

  return (
    <div>
      {/* 2. ref 속성으로 DOM에 연결 */}
      <input ref={inputRef} />
      <button onClick={focusInput}>포커스</button>
    </div>
  );
}
```

### 실전 예제

```js
import React, { useState, useRef } from "react";

function InputSample() {
  // 여러 입력값을 객체로 관리
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  // DOM 선택을 위한 ref 생성
  const nameInput = useRef();

  // 비구조화 할당으로 값 추출
  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;

    // 불변성을 지키면서 객체 업데이트
    setInputs({
      ...inputs, // 기존 객체 복사
      [name]: value, // 특정 값만 업데이트
    });
  };

  const onReset = () => {
    // 입력값 초기화
    setInputs({
      name: "",
      nickname: "",
    });
    // DOM 직접 제어 - 초기화 후 포커스
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput} // ref 연결
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        {name} ({nickname})
      </div>
    </div>
  );
}
```

## 3. 핵심 포인트

1. useRef 생성

   - `const ref = useRef()` 로 ref 객체 생성
   - 한번 생성된 ref는 컴포넌트가 없어질 때까지 유지

2. DOM 연결

   - JSX 요소에 `ref={ref이름}` 으로 연결
   - 연결된 DOM은 `ref이름.current`로 접근

3. 주요 특징

   - ref 값이 변해도 컴포넌트가 리렌더링되지 않음
   - 실제 DOM 조작이 필요한 경우에만 사용
   - useState와 달리 .current 값 변경이 자유로움

4. 사용 시 주의사항
   - DOM 조작은 꼭 필요한 경우에만 사용
   - 렌더링에 영향을 주지 않는 값 저장용으로도 활용 가능
   - 컴포넌트가 마운트된 후에만 DOM 접근 가능
