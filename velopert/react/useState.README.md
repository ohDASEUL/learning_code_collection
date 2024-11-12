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

## 이벤트 설정

- 엘리먼트에 이벤트를 설정해줄때는 `on이벤트이름={실행하고싶은함수}` 형태로 설정해야 함
- 주의사항 : onClick={onIncrease()} 이렇게 함수를 실행하면 안 됨. 이렇게하면 렌더링하는 시점에서 함수가 호출되기 때문

```js
import React from "react";
function Counter() {
  const onIncrease = () => {
    console.log("+1");
  };
  const onDecrease = () => {
    console.log("-1");
  };
  return (
    <div>
      <h1>0</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
export default Counter;
```
