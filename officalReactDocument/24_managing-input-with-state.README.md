# State를 사용해 Input 다루기

## 1. 선언형 UI와 명령형 UI 비교

### 명령형 프로그래밍에서 상호작용을 구현하는 방법

- 사용자가 폼을 제출한다고 가정

  - 폼에 무언가를 입력하면 "제출" 버튼이 활성화 됨
  - "제출" 버튼을 누르면 폼과 버튼이 _비활성화_ 되고 스피너가 _나타 날_ 것임
  - 네트워크 요청이 성공하면 폼은 _숨겨질_ 것이고, "감사합니다." 메시지가 _나타날_ 것임
  - 네트워크 요청이 실패하면 오류 메시지가 _보일_ 것이고, 폼은 다시 *활성화*될 것임.

- 아래의 명령형 UI 프로그래밍 예시는 React 없이 만들어진 폼.

```jsx
async function handleFormSubmit(e) {
  e.preventDefault();
  disable(textarea);
  disable(button);
  show(loadingMessage);
  hide(errorMessage);
  try {
    await submitForm(textarea.value);
    show(successMessage);
    hide(form);
  } catch (err) {
    show(errorMessage);
    errorMessage.textContent = err.message;
  } finally {
    hide(loadingMessage);
    enable(textarea);
    enable(button);
  }
}

function handleTextareaChange() {
  if (textarea.value.length === 0) {
    disable(button);
  } else {
    enable(button);
  }
}

function hide(el) {
  el.style.display = "none";
}

function show(el) {
  el.style.display = "";
}

function enable(el) {
  el.disabled = false;
}

function disable(el) {
  el.disabled = true;
}

function submitForm(answer) {
  // 네트워크에 접속한다고 가정
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === "istanbul") {
        resolve();
      } else {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      }
    }, 1500);
  });
}

let form = document.getElementById("form");
let textarea = document.getElementById("textarea");
let button = document.getElementById("button");
let loadingMessage = document.getElementById("loading");
let errorMessage = document.getElementById("error");
let successMessage = document.getElementById("success");
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;
```

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: sans-serif;
        margin: 20px;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <form id="form">
      <h2>City quiz</h2>
      <p>What city is located on two continents?</p>
      <textarea id="textarea"></textarea>
      <br />
      <button id="button" disabled>Submit</button>
      <p id="loading" style="display: none">Loading...</p>
      <p id="error" style="display: none; color: red"></p>
    </form>
    <h1 id="success" style="display: none">That's right!</h1>
    <script src="form.js"></script>
  </body>
</html>
```

- 위와 같이 UI를 조작하면 더 복잡한 시스템에서는 난이도가 기하급수적으로 올라감.

- React에서는 직접 UI를 조작 안 해도 됨.
  - 컴포넌트를 직접 활성화하거나, 비활성화하거나, 보여주거나, 숨길 필요 없음
  - 대신 *무엇을 보여주고 싶은지 선언*하기만 하면 됨

## 2. UI를 선언적인 방식으로 생각하기

### 1. 컴포넌트의 다양한 시각적 state 확인하기

- Empty: 폼은 비활성화된 “제출” 버튼을 가짐
- Typing: 폼은 활성화된 “제출” 버튼을 가짐
- Submitting: 폼은 완전히 비활성화되고 스피너가 보임
- Success: 폼 대신에 “감사합니다” 메시지가 보임
- Error: “Typing” state와 동일하지만 오류 메시지가 보임

```jsx
export default function App({
  // 'submitting', 'error', 'success'로 한 번 변경:
  status = "success",
}) {
  if (status === "success") {
    return <h1>That's right!</h1>;
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={status === "submitting"} />
        <br />
        <button disabled={status === "empty" || status === "submitting"}>
          Submit
        </button>
        {status === "error" && (
          <p className="Error">Good guess but a wrong answer. Try again!</p>
        )}
      </form>
    </>
  );
}
```

### 많은 시각적 state를 한 번에 보여주기

- 이런 페이지를 보통 "살아있는 스타일 가이드" 또는 "스토리북" 이라고 부름

```jsx
import Form from "./Form.js";

let statuses = ["empty", "typing", "submitting", "success", "error"];

export default function App() {
  return (
    <>
      {statuses.map((status) => (
        <section key={status}>
          <h4>Form ({status}):</h4>
          <Form status={status} />
        </section>
      ))}
    </>
  );
}
```

```jsx
export default function Form({ status }) {
  if (status === "success") {
    return <h1>That's right!</h1>;
  }
  return (
    <form>
      <textarea disabled={status === "submitting"} />
      <br />
      <button disabled={status === "empty" || status === "submitting"}>
        Submit
      </button>
      {status === "error" && (
        <p className="Error">Good guess but a wrong answer. Try again!</p>
      )}
    </form>
  );
}
```

### 2. 무엇이 state 변화를 트리거하는지 알아내기

- 두 종류의 인풋 유형으로 state 변경을 트리거 할 수 있음.

  - 버튼을 누르거나, 필드를 입력하거나, 링크를 이동하는 것 등의 휴먼 인풋
  - 네트워크 응답이 오거나, 타임아웃이 되거나, 이미지를 로딩하거나 하는 등의 컴퓨터 인풋

- 두 가지 경우 모두 UI를 업데이트하기 위해서는 *state 변수*를 설정해야 함

- 텍스트 인풋을 변경하면 (휴먼) 텍스트 상자가 비어있는지 여부에 따라 state를 Empty에서 Typing 으로 또는 그 반대로 변경
- 제출 버튼을 클릭하면 (휴먼) Submitting state를 변경해야 함
- 네트워크 응답이 성공적으로 오면 (컴퓨터) Success state를 변경해야 함
  네트워크 요청이 실패하면 (컴퓨터) 해당하는 오류 메시지와 함께 Error state를 변경해야 함

### 3. 메모리의 state를 useState로 표현하기

1. 반드시 필요한 state를 가지고 시작.

- 에를 들면 인풋의 answer은 반드시 저장해야 할 것
- 그리고 (존재한다면) 가장 최근에 발생한 error도 저장해야 할 것

```jsx
const [answer, setAnswer] = useState("");
const [error, setError] = useState(null);
```

2. 앞서 필요하다고 나열했던 나머지 시각적 state 살펴보기

- 좋은 방법이 떠오르지 않는다면 가능한 모든 시각적 state를 커버할 수 있는 확실한 것을 추가하는 방식으로 시작하기

```jsx
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

### 4. 불필요한 state 변수 제거하기

- 리팩토링 목표 : state가 사용자에게 유효한 UI를 보여주지 않는 경우를 방지하는 것

- state 변수에 관한 몇 가지 질문

  - state가 역설을 일으키지는 않나요?
    - 예를 들면 isTyping과 isSubmitting이 동시에 true일 수는 없습니다. 이러한 역설은 보통 state가 충분히 제한되지 않았음을 의미합니다. 여기에는 두 boolean에 대한 네 가지 조합이 있지만 오직 유효한 state는 세 개뿐입니다. 이러한 “불가능한” state를 제거하기 위해 세 가지 값 'typing', 'submitting', 'success'을 하나의 status로 합칠 수 있습니다.
  - 다른 state 변수에 이미 같은 정보가 담겨있진 않나요?
    - isEmpty와 isTyping은 동시에 true가 될 수 없습니다. 이를 각각의 state 변수로 분리하면 싱크가 맞지 않거나 버그가 발생할 위험이 있습니다. 이 경우에는 운이 좋게도 isEmpty를 지우고 answer.length === 0으로 체크할 수 있습니다.
  - 다른 변수를 뒤집었을 때 같은 정보를 얻을 수 있진 않나요?
    - isError는 error !== null로도 대신 확인할 수 있기 때문에 필요하지 않습니다.

- 위 정리 과정을 거친 후에는 세 가지(일곱 개에서 줄어든!) 필수 변수만 남게 됨

```jsx
const [answer, setAnswer] = useState("");
const [error, setError] = useState(null);
const [status, setStatus] = useState("typing"); // 'typing', 'submitting', or 'success'
```

- 어느 하나를 지웠을 때 정상적으로 작동하지 않는다는 점에서 이 것들이 모두 필수라는 것을 알 수 있음.

### 5. state 설정을 위해 이벤트 핸들러 연결하기

```jsx
import { useState } from "react";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>That's right!</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
    </>
  );
}

function submitForm(answer) {
  // 네트워크에 접속한다고 가정해봅시다.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

- 위 코드는 명령형 프로그래밍 예시보다 길지만 조금 더 견고함.
- 모든 상호 작용을 state로 표현하게 되면 이후 새로운 시각적 state가 추가되더라도 기존의 로직이 손상되는 것을 막을 수 있음.
- 또한, 상호작용 자체의 로직을 변경하지 않고도 각각의 state에 표시되는 항목을 변경할 수 있음
