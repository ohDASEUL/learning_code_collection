// 챌린지 1 of 3 : CSS 클래스를 추가하고 제거하기

// 사진을 클릭하면 바깥에 있는 <div>의 background--active CSS 클래스를 제거하고 <img>에 picture--active 클래스를 추가
// 배경을 다시 클릭하면 원래 CSS 클래스로 돌아오기

// 내가 작성한 코드

import { useState } from "react";
import "./App.css";

function Picture() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={`background ${isClicked ? "" : "background--active"}`}
      onClick={handleClick}
    >
      <img
        className={`picture ${isClicked ? "picture--active" : ""}`}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={handleClick}
      />
    </div>
  );
}

function App() {
  return (
    <>
      <Picture></Picture>
    </>
  );
}

export default App;
