# props 가이드

- props(properties)는 React 컴포넌트 간의 데이터 전달을 위한 핵심 메커니즘.
- 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용

## 1. 기본 개념과 사용법

### 기본적인 Props 전달

props는 컴포넌트에 속성을 전달하는 방식으로 사용

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />;
}

export default App;
```

### Props 받아서 사용하기

- 자식 컴포넌트에서는 props 객체를 통해 전달받은 값을 사용 가능함.

- 만약 name 값을 조회하고 싶다면 props.name 을 조회하면 됨.

```js
import React from "react";

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>;
}

export default Hello;
```

## 2. 다중 Props 활용하기

### 여러 props 전달

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" color="red" />;
}

export default App;
```

### Props 사용 시 구조 분해 할당

- props를 더 깔끔하게 사용하기 위해 객체 구조 분해 할당을 활용 가능함.

```js
import React from "react";

// 구조 분해 할당 전
function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>;
}

// 구조 분해 할당 후
function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

export default Hello;
```

### 인라인 스타일에서 이중 중괄호 사용 이유

1. 바깥쪽 중괄호 {}는 JSX에서 JavaScript 표현식을 삽입할 때 사용
2. 안쪽 중괄호 {}는 JavaScript 객체 리터럴을 정의할 때 사용
3. 즉, style={{ color }} 는 다음과 같은 구조:

- JSX: style={객체}
- 객체: { color: color }
- color: color는 ES6의 객체 프로퍼티 축약 표현

## 3. defaultProps로 기본값 설정하기

- props가 전달되지 않았을 때를 대비해 기본값 설정

```js
import React from "react";

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
```

- 사용 에시

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <>
      <Hello name="react" color="red" /> {/* name="react" 사용 */}
      <Hello color="pink" /> {/* name="이름없음" 사용 */}
    </>
  );
}

export default App;
```

## 4. children props 활용하기

- children은 React에서 제공하는 특별한 prop으로, 컴포넌트의 여는 태그와 닫는 태그 사이에 있는 모든 내용을 자동으로 전달받음
- 이를 통해 컴포넌트를 더 유연하게 구성할 수 있고, 재사용성을 높일 수 있음

### 주요 특징

1. 컴포넌트 합성(Composition)을 가능하게 함

- 여러 컴포넌트를 감싸는 래퍼(Wrapper) 컴포넌트를 만들 때 유용
- 공통된 스타일이나 기능을 적용할 때 사용

2. 레이아웃 구성의 유연성

- 컴포넌트의 내부 구조를 외부에서 결정할 수 있음
- 하나의 Wrapper 컴포넌트로 다양한 내용을 감쌀 수 있음

### Wrapper 컴포넌트 생성

```js
import React from "react";

function Wrapper() {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return <div style={style}></div>;
}
export default Wrapper;
```

- 이 상태로는 내부 내용이 보이지 않음 (children을 렌더링하지 않았기 때문)

### App 컴포넌트에서 Wrapper 사용

```js
import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

- Wrapper 태그 사이에 있는 두 개의 Hello 컴포넌트가 children으로 전달됨
- 이 내용들이 Wrapper 컴포넌트의 children props로 전달됨

### children props 활용하여 내용 표시

```js
import React from "react";

function Wrapper({ children }) {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return <div style={style}>{children}</div>;
}
export default Wrapper;
```

- 구조 분해 할당으로 children prop을 받아옴
- style이 적용된 div 안에 children을 렌더링하여 내부 컴포넌트들을 표시
- 이렇게 하면 테두리와 패딩이 있는 박스 안에 Hello 컴포넌트들이 표시됨
