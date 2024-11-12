# 조건부 렌더링

- 특정 조건에 따라 다른 결과물을 렌더링하는 것

```js
import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  return (
    <Wrapper>
      // true는 자바스크립트 값이기에 중괄호로 묶음
      <Hello name="react" color="red" isSpecial={true} />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
```

```js
import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    // isSpecial 이 true이냐 false 이냐에 따라서 컴포넌트의 좌측에 * 표시(삼항연산자)
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

```js
import React from "react";

function Hello({ color, name, isSpecial }) {
  // isSpecial이 false일떈 false이고, true일땐 <b>*</b>가 됨
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
