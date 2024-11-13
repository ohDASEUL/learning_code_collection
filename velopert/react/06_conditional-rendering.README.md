# 조건부 렌더링

- 특정 조건에 따라 다른 결과물을 렌더링하는 것
- React에서 자주 사용되는 중요한 패턴으로, UI를 동적으로 표현할 때 활용됨

## 조건부 렌더링의 주요 방법

### 1. 삼항 연산자 사용

- 조건 ? true일 때 표시할 내용 : false일 때 표시할 내용
- JSX 내부에서 사용 가능
- 조건에 따라 다른 내용을 보여주고 싶을 때 유용

```js
import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial ? <b>*</b> : null}안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
```

### 2. && 연산자를 활용한 조건부 렌더링

- 특정 조건이 true일 때만 내용을 보여주고 싶을 때 유용
- false일 때는 아무것도 렌더링하지 않음
- 삼항 연산자보다 더 간단한 문법으로 구현 가능

```js
import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
```

### 3. props 설정 방법

```js
import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true} />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

## props 값 설정 생략 시 규칙

- props 이름만 작성하고 값 설정을 생략하면 자동으로 true로 간주됨
- 아래 두 코드는 동일한 의미:
  - isSpecial={true}
  - isSpecial

```js
import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

## 주의사항

- 조건부 렌더링 시 falsy값(false, null, undefined, 0)은 아무것도 렌더링하지 않음
- 문자열이나 숫자는 그대로 렌더링
