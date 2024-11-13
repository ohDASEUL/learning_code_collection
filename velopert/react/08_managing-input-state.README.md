# Input 상태 관리

- React에서 input 태그의 상태를 관리하는 방법
- useState를 활용한 제어 컴포넌트(Controlled Component) 구현

## 1. 기본 구조 설정

### 초기 컴포넌트 설정

```js
import React from "react";

function InputSample() {
  return (
    <div>
      <input />
      <button>초기화</button>
      <div>
        <b>값: </b>
      </div>
    </div>
  );
}

export default InputSample;
```

### App 컴포넌트에서 렌더링

```js
import React from "react";
import InputSample from "./InputSample";

function App() {
  return <InputSample />;
}

export default App;
```

## 2. useState로 input 상태 관리하기

### input 값 상태 관리

- useState를 사용해 input의 value 값을 관리
- onChange 이벤트로 input 값 변경 감지
- 이벤트 객체(e)의 e.target.value로 현재 input 값 접근

```js
import React, { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
```
