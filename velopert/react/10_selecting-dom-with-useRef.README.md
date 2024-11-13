# useRef로 특정 DOM 선택하기

- JavaScript를 사용할 때는, 우리가 특정 DOM을 선택해야 하는 상황에 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM을 선택함.

- React에서도 가끔씩 DOM을 직접 선택해야 하는 상황이 발생할 때도 있음

  - 특정 엘리먼트의 크기를 가져와야 한다던지, 스크롤바 위치를 가져오거나 설정해야된다던지
  - 포커스를 설정해줘야된다던지
  - 그래프 관련 라이브러리 등의 외부 라이브러리를 사용해야 할때에도 특정 DOM에다 적용하기에 DOM을 선택해야 하는 상황이 발생할 수 있음

- 리액트에서 ref 라는 것을 사용함

- 함수형 컴포넌트에서 ref 사용 시 useRef라는 Hook 함수를 사용함.

- 초기화 버튼을 클릭했을 때 이름 input에 포커스가 잡히도록 useRef를 사용해 기능을 구현

```js
import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
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

- useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM에 ref 값으로 설정해줘야 함.
- Ref 객체의 .current 값은 우리가 원하는 DOM을 가르키게 됨.
