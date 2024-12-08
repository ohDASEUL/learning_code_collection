import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useUpcomingMovies } from "../../../../hooks/useUpcomingMovies";

const UpcomingMovieSlide = () => {
  const { data, isLoading, error } = useUpcomingMovies();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const carouselRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    Swal.fire({
      title: "Error",
      text: `데이터를 불러오는데 실패했습니다: ${error.message}`,
      icon: "error",
    });
    return null;
  }

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  const handleSlideChange = (previousSlide, nextSlide) => {
    setCurrentSlide(nextSlide === 0 ? 0 : 1);
  };

  return (
    <MovieSlider
      movies={data?.results}
      currentSlide={currentSlide}
      showControls={showControls}
      carouselRef={carouselRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onSlideChange={handleSlideChange}
      onPrevious={handlePrevious}
      onNext={handleNext}
      title="🎬 기대작 미리보기"
      responsive={responsive}
    />
  );
};

export default UpcomingMovieSlide;
