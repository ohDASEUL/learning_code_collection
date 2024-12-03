import { useState } from "react";
import "./App.css";
// 챌린지 2 of 3 : 프로필 편집기

// 하나는 편집 모드이고 이때 인풋들을 볼 수 있습니다. 또 다른 하나는 보기 모드이고 이때는 오직 결과만 볼 수 있음
// 버튼의 라벨은 속한 모드에 따라 “Edit”과 “Save”로 변경
// 또한 인풋들의 내용을 변경할 때 환영 메시지를 실시간으로 확인 가능.

// 해설 코드

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Jacobs");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
      }}
    >
      <label>
        First name:{" "}
        {isEditing ? (
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        ) : (
          <b>{firstName}</b>
        )}
      </label>
      <label>
        Last name:{" "}
        {isEditing ? (
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        ) : (
          <b>{lastName}</b>
        )}
      </label>
      <button type="submit">{isEditing ? "Save" : "Edit"} Profile</button>
      <p>
        <i>
          Hello, {firstName} {lastName}!
        </i>
      </p>
    </form>
  );
}
function App() {
  return (
    <>
      <Profile></Profile>
    </>
  );
}

export default App;
