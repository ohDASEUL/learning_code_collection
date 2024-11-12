# JSX 기본 규칙

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
