# useState 가이드

- useState는 React 컴포넌트에서 상태를 관리하기 위한 Hook
- 함수형 컴포넌트 내에서 변경 가능한 상태값을 관리할 때 사용

## 1. 기본 개념과 사용법

### useState 호출하기

- useState는 배열을 반환하며, 구조 분해 할당으로 사용

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

### useState 구문 이해하기

```js
// 구조 분해 할당 전
const numberState = useState(0);
const number = numberState[0]; // 현재 상태값
const setNumber = numberState[1]; // Setter 함수

// 구조 분해 할당 후
const [number, setNumber] = useState(0);
```

- useState()는 두 개의 원소를 가진 배열을 반환
  - 첫 번째: 현재 상태값
  - 두 번째: 상태를 변경하는 Setter 함수
- useState(0)에서 0은 상태의 초기값
- 초기값으로 모든 타입(숫자, 문자열, 불리언, 배열, 객체 등) 사용 가능

## 2. 상태 업데이트

### 기본적인 상태 업데이트

- 이벤트 핸들러 설정

- 이벤트 핸들러는 on이벤트이름={함수} 형태로 설정
- 주의: onClick={onIncrease()} 처럼 함수를 호출하면 안 됨
  - 잘못된 방식: 렌더링 시점에 함수가 즉시 실행됨
  - 올바른 방식: 함수 레퍼런스만 전달하여 클릭 시점에 실행되도록 함

```js
import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);

  // 잘못된 방식 - 렌더링 시점에 실행됨
  const handleWrongClick = onClick={onIncrease()}

  // 올바른 방식 - 클릭 시점에 실행됨
  const handleCorrectClick = onClick={onIncrease}

  const onIncrease = () => {
    setNumber(number + 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
    </div>
  );
}
```

### 상태 업데이트 기초

1. useState 초기화

```js
// 기본적인 방식
const [number, setNumber] = useState(0);

// 구조 분해 할당을 사용하지 않은 방식
const numberState = useState(0);
const number = numberState[0]; // 현재 상태
const setNumber = numberState[1]; // 상태 변경 함수
```

2. 단순 값 업데이트

```js
function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1); // 현재 값에 1을 더함
  };

  const onDecrease = () => {
    setNumber(number - 1); // 현재 값에서 1을 뺌
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
```

### 함수형 업데이트 방식

- 기본 사용법
  - 이전 상태값을 기반으로 업데이트할 때 사용
  - 함수를 전달하여 이전 상태값을 매개변수로 받음
  - 성능 최적화와 안정적인 상태 업데이트에 유용

```js
import React, { useState } from "react";
function Counter() {
  const [num, setNum] = useState(0);

  const onIncrease = () => {
    console.log("+1");
    setNum((prevNum) => prevNum + 1);
  };
  const onDecrease = () => {
    console.log("-1");
    setNum((prevNum) => prevNum - 1);
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

## 3. 주의사항

### 상태 업데이트 시점

```js
function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    // 이렇게 연속으로 호출하면 의도한 대로 동작하지 않을 수 있음
    setNumber(number + 1); // 비동기적으로 작동
    setNumber(number + 1);

    // 대신 함수형 업데이트를 사용하면 안전하게 이전 상태를 기반으로 업데이트 가능
    setNumber(prev => prev + 1);
    setNumber(prev => prev + 1);
  };

  return (/*...*/)
}
```

### 상태 업데이트 후 즉시 사용

```js
const [count, setCount] = useState(0);

// 잘못된 방법
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // 이전 값이 출력됨
};

// 올바른 방법
const handleClick = () => {
  setCount((prev) => {
    const newCount = prev + 1;
    console.log(newCount); // 업데이트된 값을 즉시 사용
    return newCount;
  });
};
```

### 객체 상태 다루기

- 객체를 상태로 사용할 때는 반드시 새로운 객체를 생성하여 업데이트
- 직접 객체를 수정하면 React가 상태 변화를 감지하지 못함

```javascript
// 잘못된 방법
const [user, setUser] = useState({ name: "Kim", age: 25 });
user.age = 26; // 직접 수정 X

// 올바른 방법
setUser((prevUser) => ({ ...prevUser, age: 26 }));
```
