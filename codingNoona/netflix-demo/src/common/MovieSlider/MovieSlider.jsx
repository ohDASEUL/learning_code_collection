import React, { useMemo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./MovieSlider.style.css";

const MovieSlider = ({
  movies,
  currentSlide,
  showControls,
  RankNumbers,
  carouselRef,
  onMouseEnter,
  onMouseLeave,
  onSlideChange,
  onPrevious,
  onNext,
  title,
  responsive,
}) => {
  // visibleMovies 로직을 이 컴포넌트로 이동
  const visibleMovies = useMemo(() => {
    if (!movies) return [];
    const totalMovies = movies.slice(0, 10);

    if (currentSlide === 0) {
      return totalMovies.slice(0, 6); // 첫 슬라이드: 1,2,3,4,5,6
    } else {
      // 두번째 슬라이드를 위한 새로운 배열 생성
      return [
        totalMovies[5], // 6
        totalMovies[6], // 7
        totalMovies[7], // 8
        totalMovies[8], // 9
        totalMovies[9], // 10
        totalMovies[0], // 1 (처음으로 돌아감)
      ];
    }
  }, [currentSlide, movies]);

  const CustomButtonGroup = () => (
    <div>
      <button
        onClick={onPrevious}
        className={`custom-arrow left ${showControls ? "show" : ""}`}
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
      </button>
      <button
        onClick={onNext}
        className={`custom-arrow right ${showControls ? "show" : ""}`}
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </button>
    </div>
  );

  return (
    <div
      className="popular-movies-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3 className="section-title">{title}</h3>
      <div className="carousel-wrapper">
        <Carousel
          ref={carouselRef}
          infinite={false}
          centerMode={false}
          itemClass="movie-slider-item"
          containerClass="netflix-carousel"
          responsive={responsive}
          arrows={false}
          customButtonGroup={<CustomButtonGroup />}
          renderButtonGroupOutside={true}
          draggable={false}
          swipeable={false}
          partialVisible={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          beforeChange={onSlideChange}
        >
          {visibleMovies.map((movie, index) => {
            return (
              <div key={movie.id} className="slider-card">
                {RankNumbers && (
                  <div className="rank-number">
                    {
                      currentSlide === 0
                        ? RankNumbers[index + 1] // 첫 슬라이드는 그대로 1,2,3,4,5,6
                        : RankNumbers[index === 5 ? 1 : index + 6] // 두번째 슬라이드는 6,7,8,9,10,1
                    }
                  </div>
                )}
                <div className="card-with-number">
                  <MovieCard movie={movie} />
                  {movie.release_date &&
                    new Date(movie.release_date) >
                      new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) && (
                      <span className="new-badge">최신 등록</span>
                    )}
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieSlider;
