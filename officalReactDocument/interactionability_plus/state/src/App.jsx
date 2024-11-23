// 챌린지 2 of 4

// 폼 입력 불가 문제 고치기

// 입력 필드에 입력하면 아무것도 나타나지 않음
// 마치 입력값이 빈 문자열로 “고정”된 것처럼 보임
// 두 입력 모두 onChange 이벤트 핸들러를 가지고 있으며, 최신 사용자 입력(e.target.value)을 기반으로 변수를 업데이트하려고 시도
// 그러나 변수들은 다시 렌더링 되는 동안 값을 “기억”하지 않는 것처럼 보임
// state 변수를 사용하여 이 문제를 해결

export default function App() {
  let firstName = "";
  let lastName = "";

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = "";
    lastName = "";
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>
        Hi, {firstName} {lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
