# JSX 기본 규칙

- JSX는 자바스크립트 안에서 XML을 사용하는 문법

## 꼭 닫혀야 하는 태그

- 태그를 열었으면 꼭, <div></div> 이런 식으로 닫아줘야 함
- 태그와 태그 사이 내용이 들어가지 않더라도, Self Closing 태그를 사용해야 함

## 꼭 감싸져야하는 태그

- 두 개 이상의 태그는 무조건 하나의 태그로 감싸져야 함.

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <div>
      <Hello />
      <div>안녕히계세요</div>
    </div>
  );
}

export default App;
```

- but, div 보다는 Fragment를 사용하는 게 더 좋음
  - why? 스타일 관련 설정을 하다가 복잡해지게 되는 상황도 올 수 있고
  - table 관련 태그를 작성할 때에도 내용을 div 같은 걸로 감싸기엔 애매하기 때문

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <>
      <Hello />
      <div>안녕히계세요</div>
    </>
  );
}

export default App;
```

- 태그 작성 시 이름 없이 작성을 하게되면 Fragment 가 생성되는데, 이는 브라우저 상에서 따로 별도의 엘리먼트로 나타나지 않음.

## jsx 안에 자바스크립트 값 사용

- {} 으로 감싸주기

```js
import React from "react";
import Hello from "./Hello";

function App() {
  const name = "react";
  return (
    <>
      <Hello />
      <div>{name}</div>
    </>
  );
}

export default App;
```

## style

- 인라인 스타일은 객체 형태로 작성할 것
- background-color 처럼 - 로 구분된 이름은 backgroundColor 처럼 camelCase 형태로 네이밍 해줘야 함

```js
import React from "react";
import Hello from "./Hello";

function App() {
  const name = "react";
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: 24, // 기본 단위 px
    padding: "1rem", // 다른 단위 사용 시 문자열로 설정
  };

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  );
}

export default App;
```

## className

- CSS class를 설정할 때는 className= 설정해야 함
- class= 라고 쓰지 않는 이유는 class 는 자바스크립트 예약어(클래스 정의)으로 사용 되는데 이로 인해 혼란이 올 수 있음.

```js
import React from "react";
import Hello from "./Hello";
import "./App.css";

function App() {
  const name = "react";
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: 24, // 기본 단위 px
    padding: "1rem", // 다른 단위 사용 시 문자열로 설정
  };

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
    </>
  );
}

export default App;
```
