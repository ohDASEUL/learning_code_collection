import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Swal from "sweetalert2";
import "./Banner.style.css";

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
  console.log("Popular movies data:", data);
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.results[2].poster_path}` +
          ")",
      }}
      className="banner"
    >
      <div className="banner-text-area">
        <h1>{data.results[0].title}</h1>
        <p>{data.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
