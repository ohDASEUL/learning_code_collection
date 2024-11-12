# props(properties)를 통해 컴포넌트에게 값 전달

## 1. 기본 사용법

- 가정 : App 컴포넌트에서 Hello 컴포넌트 사용 시 name 이라는 값을 전달

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />;
}

export default App;
```

- Hello 컴포넌트에서 name 값을 사용하고 싶을 때 컴포넌트에게 전달되는 props는 파라미터를 통해 조회 가능함.

- props 는 객체 형태로 전달되며, 만약 name 값을 조회하고 싶다면 props.name 을 조회하면 됨.

```js
import React from "react";

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>;
}

export default Hello;
```

## 2. 여러 개의 props

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" color="red" />;
}

export default App;
```

```js
import React from "react";

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>;
}

export default Hello;
```

- props 내부의 값을 조회할 때마다 props. 를 입력하고 있는데, 함수의 파라미터에서 비구조화 할당(혹은 구조 분해) 문법을 사용하면 조금 더 코드를 간결하게 작성 가능함.

```js
import React from "react";

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

export default Hello;
```

## 3. defaultProps 로 기본값 설정

- 컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용할 값을 설정하고, 컴포넌트에 defaultProps 라는 값을 설정하면 됨

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

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <>
      <Hello name="react" color="red" />
      <Hello color="pink" />
    </>
  );
}

export default App;
```
