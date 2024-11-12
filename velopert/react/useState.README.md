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

## 동적인 값 끼얹기, useState

- useState 함수를 사용하면 컴포넌트에서 상태 관리 가능

```js
import React, { useState } from "react";
function Counter() {
  const [num, setNum] = useState(0);

  const onIncrease = () => {
    console.log("+1");
    setNum(num + 1);
  };
  const onDecrease = () => {
    console.log("-1");
    setNum(num - 1);
  };
  return (
    <div>
      <h1>{num}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
export default Counter;
```

- useState를 사용 할 때는 상태의 기본값을 파라미터로 넣어서 호출해줌
  > const [number, setNumber] = useState(0);
- 이 함수를 호출하면 배열이 반환되는데, 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수
- 원래는 다음과 같이 해야 함

```js
const numState = useState(0);
const num = numState[0];
const setNum = numState[1];
```

- 배열 비구조화 할당을 통해 각 원소를 추출해준 것

```js
const onIncrease = () => {
  setNumber(num + 1);
};

const onDecrease = () => {
  setNumber(num - 1);
};
```

- Setter 함수는 파라미터로 전달 받은 값을 최신 상태로 설정해줌.

  > <h1>{num}</h1>

- h1 태그에서는 이제 0 이 아닌 {num} 값을 보여줘야 함
