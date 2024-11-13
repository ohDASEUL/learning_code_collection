# JSX 기본 규칙

- JSX는 React에서 UI를 구성하기 위해 사용되는 JavaScript의 확장 문법으로 HTML과 유사해 보이지만, 실제로는 JavaScript 객체로 변환되어 실행

## 1. 기본 문법 규칙

### 태그 닫기 (Closing Tags)

- 모든 태그는 반드시 닫혀야 함
- HTML과 달리 자체 닫는 태그(Self-closing-tags)도 반드시 닫아야 함
  - 올바른 예: `<img src="..." />`, `<input type="text" />`
  - 잘못된 예: `<img src="...">`, `<input type="text">`

### 단일 루트 엘리먼트(Single Root Element)

- 모든 JSX 표현식은 반드시 하나의 부모 요소로 감싸져야 함
- 이는 React가 Virtual DOM에서 컴포넌트 변화를 효율적으로 비교하기 위함.

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

### Fragment 사용

- 불필요한 DOM 노드를 만들지 않기 위해 Fragment를 사용가능함.
- Fragment는 <React.Fragment> 또는 단축 문법 <>...</>으로 사용 가능
- 장점
  - DOM 트리에 별도의 노드를 추가하지 않음
  - 메모리 사용량 감소
  - CSS 스타일링이 더 간단해짐
  - 특히 `<table>, <select>` 등의 특수한 부모-자식 관계가 필요한 경우에 유용

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

## 2. JavaScript 표현식 사용

### 중괄호{}를 통한 JavaScript 표현식 사용

- 변수, 함수 호출, 계산식 등 모든 유효한 JavaScript 표현식 사용 가능

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

## 3. 스타일링

### 인라인 스타일

- React에서 인라인 스타일은 객체 형태로 작성
- CSS 속성명은 camelCase로 작성 (예: backgroundColor)
- 숫자값은 자동으로 'px' 단위가 적용됨
- 다른 단위나 특수한 값은 문자열로 지정

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

### CSS 클래스 적용

- HTML의 class 속성 대신 className을 사용
- 이는 JavaScript의 class 키워드와의 충돌을 피하기 위함
- 외부 CSS 파일을 import하여 사용 가능

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

## 4. 주석 작성하기

1. JSX 내부 : `{/* 주석 */}`

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
      {/* 주석은 화면에 보이지 않습니다 */}
      /* 중괄호로 감싸지 않으면 화면에 보입니다 */
      <Hello />
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
    </>
  );
}

export default App;
```

- 태그 내부 : `// 주석`

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
      {/* 주석은 화면에 보이지 않습니다 */}
      /* 중괄호로 감싸지 않으면 화면에 보입니다 */
      <Hello
      // 열리는 태그 내부에서는 이렇게 주석을 작성 할 수 있습니다.
      />
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
    </>
  );
}

export default App;
```
