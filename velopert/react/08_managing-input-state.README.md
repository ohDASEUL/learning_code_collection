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

## 3. 주요 개념

### 제어 컴포넌트 (Controlled Component)

- React가 input의 value를 직접 제어
- input의 value 속성과 onChange 이벤트를 연동
- 상태값과 input 값이 항상 동기화됨

### DOM 이벤트 객체

- onChange 이벤트의 첫 번째 파라미터로 이벤트 객체(e) 전달
- e.target: 이벤트가 발생한 DOM 요소 참조
- e.target.value: input에 입력된 현재 값

## 4. 주의사항

### 상태 업데이트

- input의 value 속성은 반드시 상태값과 연결돼야 함
- 상태 업데이트는 반드시 setState 함수(setText)를 통해 수행
- 직접적인 DOM 조작 지양

### 초기화 기능

- 초기화 버튼 클릭 시 빈 문자열('')로 상태 초기화
- value 속성이 상태와 연결되어 있으므로 화면에서도 즉시 반영

### 이벤트 핸들링

- 이벤트 핸들러는 화살표 함수로 정의해 바인딩 문제 방지
- 컴포넌트 내부에서 이벤트 핸들러 함수 정의
