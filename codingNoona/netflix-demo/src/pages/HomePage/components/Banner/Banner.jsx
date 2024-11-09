import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Swal from "sweetalert2";
import "./Banner.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const { data, isLoading, error } = usePopularMoviesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    Swal.fire({
      title: "Error",
      text: `데이터를 불러오는데 실패했습니다: ${error.message}`,
      icon: "error",
    });
    return null;
  }

  // 한글 데이터가 있는 영화 찾기
  const movie =
    data.results.find(
      (movie) =>
        // 한글 데이터가 있는지 확인 (정규식으로 한글 포함 여부 체크)
        movie.title &&
        movie.overview &&
        movie.backdrop_path &&
        (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(movie.title) ||
          /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(movie.overview))
    ) || data.results[0];

  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/original/${movie.backdrop_path}` +
          ")",
      }}
    >
      <div className="banner-text-area">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="banner-buttons">
          <button className="banner-button play-button">
            <FontAwesomeIcon icon={faPlay} className="button-icon" />
            재생
          </button>
          <button className="banner-button info-button">
            <FontAwesomeIcon icon={faCircleInfo} className="button-icon" />
            상세정보
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
