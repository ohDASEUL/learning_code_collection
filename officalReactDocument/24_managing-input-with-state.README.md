# State를 사용해 Input 다루기

## 1. 선언형 UI와 명령형 UI 비교

### 명령형 프로그래밍에서 상호작용을 구현하는 방법

명령형은 UI 조작을 하나하나 직접 해야 함. 예를 들어 폼 제출할 때:

- 입력값 있으면 버튼 활성화
- 제출 누르면 폼/버튼 비활성화하고 스피너 표시
- 성공하면 폼 숨기고 성공 메시지 표시
- 실패하면 에러 표시하고 폼 다시 활성화

이런 식으로 매번 요소를 직접 조작해야 해서 복잡한 UI 만들기 어려움.

근데 React는 다름:

- UI 직접 조작 안 해도 됨
- 그냥 "이런 상태일 때 이렇게 보여줘" 하고 선언만 하면 됨

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

## 2. UI를 선언적인 방식으로 생각하기

### 1. 컴포넌트의 시각적 state

React에선 UI를 상태별로 나누어서 생각함. 위 폼의 경우:

- Empty: 제출 버튼 비활성화
- Typing: 제출 버튼 활성화
- Submitting: 폼 전체 비활성화, 스피너 표시
- Success: 폼 대신 성공 메시지
- Error: Typing 상태와 같은데 에러 메시지만 추가

이렇게 상태를 나누고, 각 상태에서 UI가 어떻게 보여야 하는지 선언하면 됨.

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

모든 상태의 UI를 한번에 보고 싶을 때가 있음.
이걸 "살아있는 스타일 가이드" 또는 "스토리북" 이라고 부름.
각 상태마다 컴포넌트가 어떻게 보이는지 확인하기 좋음.

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

### 2. state 변화를 트리거하는 요소들

state를 바꾸는 건 크게 두 종류 입력이 있음:

1. 사람이 하는 입력:

- 버튼 클릭
- 필드 입력
- 링크 이동 등

2. 컴퓨터가 하는 입력:

- 네트워크 응답 도착
- 타임아웃 발생
- 이미지 로딩 완료 등

두 경우 모두 state 변수를 설정해서 UI를 업데이트해야 함.

예시로 위 폼에서:

사람의 입력:

- 텍스트 입력하면 Empty ↔ Typing state 변경
- 제출 버튼 누르면 Submitting state로 변경

컴퓨터의 입력:

- 네트워크 응답 성공하면 Success state로 변경
- 네트워크 응답 실패하면 Error state로 변경

### 3. 메모리의 state를 useState로 표현하기

1. 필수 state 먼저 정의하기

- 반드시 기억해야 하는 데이터부터 시작
- 예: 폼의 입력값과 에러 메시지

```jsx
const [answer, setAnswer] = useState("");
const [error, setError] = useState(null);
```

2. 시각적 state 정의하기

- UI 상태를 나타내는 state 추가
- 확실하지 않으면 일단 모든 상태를 다 표현할 수 있게 만들기

```jsx
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

### 4. 불필요한 state 변수 제거하기

리팩토링으로 불필요한 state를 줄이기.
이상한 UI가 나오는 걸 막는 게 목표.

state 검토할 때 이런 질문들 하기:

1. state가 모순되는 경우 있음?

- 예: isTyping이랑 isSubmitting 둘 다 true일 순 없음
- 이럴 땐 하나의 status로 합치기 ('typing', 'submitting', 'success')

2. 다른 state랑 중복됨?

- 예: isEmpty는 answer.length === 0으로 대체 가능
- 중복된 state는 버그 위험 있음

3. 다른 state로 계산 가능함?

- 예: isError는 error !== null로 체크 가능
- 이런 건 state로 안 만들어도 됨

정리하면 이렇게 세 개만 있으면 됨:

```jsx
const [answer, setAnswer] = useState("");
const [error, setError] = useState(null);
const [status, setStatus] = useState("typing"); // 'typing', 'submitting', or 'success'
```

이 셋은 하나라도 빼면 제대로 동작 안 함. 딱 필요한 것만 남은 거.

### 5. state 설정을 위해 이벤트 핸들러 연결하기

마지막으로 이벤트 핸들러로 state 업데이트하기. 아래는 최종 코드임:

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

이렇게 state로 UI 다루면 좋은 점:

1. 코드가 좀 더 길어도 더 견고함
2. 새로운 상태 추가해도 기존 로직 안 망가짐
3. 상태별 UI 변경이 쉬움
