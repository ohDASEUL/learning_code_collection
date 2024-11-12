# useState를 통해 컴포넌트에서 바뀌는 값 관리하기

- 리액트 컴포넌트에서는 사용자 인터렉션에 따라 변하는 동적인 값들을 상태(state)로 관리 가능함.
- 함수형 컴포넌트에서는 React Hooks를 사용해 이러한 상태를 관리.

## Counter 컴포넌트 생성

```js
import React from "react";

function Counter() {
  return (
    <div>
      <h1>0</h1>
      <button>+1</button>
      <button>-1</button>
    </div>
  );
}

export default Counter;
```

```js
import React from "react";
import Counter from "./Counter";

function App() {
  return <Counter />;
}

export default App;
```
