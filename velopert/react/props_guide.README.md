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
