import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
export const useUpcomingMovies = (params = {}) => {
  return useQuery({
    queryKey: ["movies", "upcomming", params],
    queryFn: () => api.movies.getUpcoming(params),
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 30 * 60 * 1000, // 30분
  });
};
