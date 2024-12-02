// 챌린지 2 of 3 : 프로필 편집기

// 하나는 편집 모드이고 이때 인풋들을 볼 수 있습니다. 또 다른 하나는 보기 모드이고 이때는 오직 결과만 볼 수 있음
// 버튼의 라벨은 속한 모드에 따라 “Edit”과 “Save”로 변경
// 또한 인풋들의 내용을 변경할 때 환영 메시지를 실시간으로 확인 가능.

function EditProfile() {
  return (
    <form>
      <label>
        First name: <b>Jane</b>
        <input />
      </label>
      <label>
        Last name: <b>Jacobs</b>
        <input />
      </label>
      <button type="submit">Edit Profile</button>
      <p>
        <i>Hello, Jane Jacobs!</i>
      </p>
    </form>
  );
}
function App() {
  return (
    <>
      <EditProfile></EditProfile>
    </>
  );
}

export default App;
