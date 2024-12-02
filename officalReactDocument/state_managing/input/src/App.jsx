// 챌린지 1 of 3 : CSS 클래스를 추가하고 제거하기

// 사진을 클릭하면 바깥에 있는 <div>의 background--active CSS 클래스를 제거하고 <img>에 picture--active 클래스를 추가
// 배경을 다시 클릭하면 원래 CSS 클래스로 돌아오기

// 해설 코드

import { useState } from "react";
import "./App.css";

function Picture() {
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = "background";
  let pictureClassName = "picture";
  if (isActive) {
    pictureClassName += " picture--active";
  } else {
    backgroundClassName += " background--active";
  }

  return (
    <div className={backgroundClassName} onClick={() => setIsActive(false)}>
      <img
        onClick={(e) => {
          e.stopPropagation();
          setIsActive(true);
        }}
        className={pictureClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
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
