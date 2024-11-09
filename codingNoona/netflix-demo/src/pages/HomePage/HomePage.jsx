import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";

// 1. 배너 => popular 영화를 들고와서 첫 번째 아이템 보여주기
const HomePage = () => {
  return (
    <div className="bg-dark text-light">
      <Banner />
      <PopularMovieSlide />
    </div>
  );
};

export default HomePage;
