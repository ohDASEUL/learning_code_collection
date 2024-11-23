// 챌린지 4 of 4

// 불필요한 state 제거하기

// 버튼이 클릭 되면 사용자의 이름을 요청하고 그런 다음 환영 메시지를 표시해야 함
// 이름을 유지하기 위해 state를 사용하려고 했지만, 어떤 이유로 항상 “Hello, !”라고 표시 됨

// 이 코드를 수정하려면 불필요한 state 변수를 제거

import { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");

  function handleClick() {
    setName(prompt("What is your name?"));
    alert(`Hello, ${name}!`);
  }

  return <button onClick={handleClick}>Greet</button>;
}
