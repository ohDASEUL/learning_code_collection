# 9. 여러 개의 input 상태 관리하기

- input이 비어져있을때 input에 대한 설명을 보여주는 placeholder 값도 설정

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

- input의 개수가 여러 개가 됐을때는, 단순히 useState를 여러 번 사용하고, onChange도 여러 개 만들어서 구현 가능함
- but. 좋은 방법은 아님.

- 좋은 방법은 input에 name을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것
- useState에서는 객체 형태 상태를 관리해야함.

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

- React 상태에서 객체를 수정할 때는 다음과 깉이 직접 수정하면 안 됨.

  > inputs[name] = value;

- 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해야함.

```js
setInputs({
  ...inputs,
  [name]: value,
});
```

- ...문법은 spread 문법으로 객체의 내용을 모두 '펼쳐서' 기존 객체를 복사함
