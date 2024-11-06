import React from "react";
import Banner from "./components/Banner/Banner";

// 1. 배너 => popular 영화를 들고와서 첫 번째 아이템 보여주기
const HomePage = () => {
  return (
    <div className="bg-dark text-light vh-100">
      <Banner />
    </div>
  );
};

export default HomePage;
