# 9. 여러 개의 input 상태 관리하기

## 1. 기본 구조 설정

### 초기 컴포넌트 설정

```js
import React, { useState } from "react";

function InputSample() {
  const onChange = (e) => {};

  const onReset = () => {};

  return (
    <div>
      <input placeholder="이름" />
      <input placeholder="닉네임" />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        이름 (닉네임)
      </div>
    </div>
  );
}

export default InputSample;
```

## 2. 여러 input 상태 관리 방법

### 비효율적인 방법

- 각 input 마다 별도의 useState 사용
- 각각의 onChange 핸들러 생성
- 결과 : 코드가 길어지고 관리가 어려움

### 효율적인 방법

- input에 name 속성 부여
- 하나의 객체로 상태 관리
- 하나의 onChange 핸들러로 모든 input 관리

```js
import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name과 value 를 추출
    setInputs({
      ...inputs, // 기존 input 객체 복사
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

## 3. 주요 개념

### 객체 상태 관리

- React 객체 상태는 불변성을 지켜야 함.
- 직접적인 상태 수정 금지
  > inputs[name] = value;
- spread 연산자를 사용한 새로운 객체 생성

### spread 연산자 활용

```js
setInputs({
  ...inputs, // 기존 객체의 내용을 펼침
  [name]: value, // 특정 값만 덮어쓰기
});
```

## 4. 주의사항

### 상태 불변성

- 객체의 직접적인 수정 피하기
- 항상 새로운 객체를 생성해 상태 업데이트
- spread 연산자를 활용한 객체 복사

### 컴포넌트 최적화

- 불변성을 지키지 않으면 리렌더링이 제대로 동작하지 않을 수 있음

### 상태 업데이트

- setState 함수(setInputs)를 통한 상태 업데이트 필수
