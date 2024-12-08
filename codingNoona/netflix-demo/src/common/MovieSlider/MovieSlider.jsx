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
    return currentSlide === 0
      ? totalMovies.slice(0, 6)
      : totalMovies.slice(4, 10);
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
            const actualIndex = currentSlide === 0 ? index : index + 4;
            return (
              <div key={movie.id} className="slider-card">
                <div className="rank-number">
                  {RankNumbers[actualIndex + 1]}
                </div>
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
