// 챌린지 3 of 4

// 충돌 고치기

// 사용자가 피드백을 남길 수 있는 간단한 폼이 있는데, 피드백을 제출하면 감사 메시지가 표시되어야 함
// 그러나 “예상보다 적은 훅을 렌더링했습니다”라는 오류 메시지와 함께 충돌이 발생

import { useState } from "react";

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    // eslint-disable-next-line
    const [message, setMessage] = useState("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Sending: "${message}"`);
          setIsSent(true);
        }}
      >
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
