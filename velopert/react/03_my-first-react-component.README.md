# 리액트 컴포넌트 만들기

1. 컴포넌트명.js 생성

- 최상단
  ```js
  import React from "react";
  ```
- 최하단

  ```js
  export default 컴포넌트명;
  ```

2. App.js

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <div>
      <Hello />
    </div>
  );
}

export default App;
```

- 컴포넌트는 일종의 UI 조각으로 재사용이 가능함.

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}

export default App;
```

3.

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

- ReactDOM.createRoot()는 React 앱의 최상위 렌더링 지점을 생성함.
- document.getElementById("root")를 통해 public/index.html 파일 내부의 <div id="root"></div> 요소를 찾아 이 위치에 React 앱을 마운트함
- 생성된 root 객체의 render() 메서드를 호출해 실제 리액트 컴포넌트를 DOM에 렌더링하는데, 이때 <React.StrictMode>로 감싸서 개발 시 잠재적인 문제들을 미리 감지할 수 있도록 도와줌.
- 결론 : <App /> 컴포넌트와 그 하위의 모든 컴포넌트들이 root div 내부에 렌더링 되고, 이는 React의 가상 DOM이 실제 브라우저의 DOM으로 변환되어 사용자에게 보여지는 과정임.
