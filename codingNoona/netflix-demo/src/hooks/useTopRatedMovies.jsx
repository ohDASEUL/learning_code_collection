import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
export const useTopRatedMovies = (params = {}) => {
  return useQuery({
    queryKey: ["movies", "toprated", params],
    queryFn: () => api.movies.getTopRated(params),
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 30 * 60 * 1000, // 30분
  });
};
