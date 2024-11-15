# React Props 핵심 가이드

## Props란?

- React 컴포넌트 간 데이터 전달을 위한 핵심 메커니즘
- 부모 → 자식 컴포넌트로의 단방향 데이터 흐름을 구현

## 1. Props 기본 사용법

### Props 전달하기

```js
// App.js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />; // name이라는 prop을 "react"값과 함께 전달
}

export default App;
```

### Props 받아서 사용하기

```js
// Hello.js
import React from "react";

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>; // props 객체에서 name 값을 조회
}

export default Hello;
```

## 2. Props 활용 심화

### 다중 Props 전달

```js
// 여러 개의 props를 한번에 전달 가능
function App() {
  return <Hello name="react" color="red" />; // 여러 속성을 전달
}
```

### 구조 분해 할당으로 깔끔하게 사용

```js
// 구조 분해 할당을 통해 더 깔끔한 코드 작성 가능
function Hello({ color, name }) {
  // props 객체를 직접 분해
  return (
    <div style={{ color }}>
      {" "}
      // {{ color }} -> 바깥쪽: JSX 표현식, 안쪽: 객체 리터럴 안녕하세요 {name}
    </div>
  );
}
```

## 3. 기본값 설정

### defaultProps 활용

```js
function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

// props가 전달되지 않았을 때 사용할 기본값 설정
Hello.defaultProps = {
  name: "이름없음",
};
```

## 4. children props

### 핵심 특징

- 컴포넌트 태그 사이의 내용을 자동으로 전달받는 특별한 prop
- 컴포넌트 합성과 레이아웃 구성에 매우 유용

### 실전 예제

```js
// Wrapper.js
function Wrapper({ children }) {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return (
    <div style={style}>
      {children} // 여기서 children을 렌더링해야 내부 컴포넌트가 표시됨
    </div>
  );
}

// App.js에서 사용
function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" /> // 이 내용들이 children으로 전달됨
      <Hello color="pink" />
    </Wrapper>
  );
}
```

## 주요 포인트

1. props는 읽기 전용 (컴포넌트 내부에서 변경 불가)
2. 부모에서 자식으로만 전달 가능 (단방향 데이터 흐름)
3. 다양한 타입의 데이터 전달 가능 (문자열, 숫자, 객체, 함수 등)
4. children prop을 통해 컴포넌트의 합성 패턴 구현 가능
