import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
export const usePopularMoviesQuery = (params = {}) => {
  return useQuery({
    queryKey: ["movies", "popular", params],
    queryFn: () => api.movies.getPopular(params),
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 30 * 60 * 1000, // 30분
  });
};
