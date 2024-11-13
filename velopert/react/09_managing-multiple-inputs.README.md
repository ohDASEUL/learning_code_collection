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
