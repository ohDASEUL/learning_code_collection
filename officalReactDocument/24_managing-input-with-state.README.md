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

- 두 가지 경우 모두 _UI를 업데이트하기 위해서는 state 변수를 설정해야 함_

- 텍스트 인풋을 변경하면 (휴먼) 텍스트 상자가 비어있는지 여부에 따라 state를 Empty에서 Typing 으로 또는 그 반대로 변경
- 제출 버튼을 클릭하면 (휴먼) Submitting state를 변경해야 함
- 네트워크 응답이 성공적으로 오면 (컴퓨터) Success state를 변경해야 함
  네트워크 요청이 실패하면 (컴퓨터) 해당하는 오류 메시지와 함께 Error state를 변경해야 함
