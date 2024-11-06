import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

const Banner = () => {
  const { data, isLoading, error } = usePopularMoviesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;
  console.log("Popular movies data:", data);
  return <div>Banner</div>;
};

export default Banner;
