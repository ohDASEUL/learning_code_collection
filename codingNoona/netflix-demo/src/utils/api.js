const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const api = {
  baseURL: "https://api.themoviedb.org/3",

  fetchData: async (endPoint, queryParams = {}) => {
    if (!API_KEY) {
      throw new Error(
        "TMDB API Key가 설정되지 않았습니다. 환경 변수를 확인해주세요."
      );
    }

    try {
      const params = new URLSearchParams({
        ...queryParams,
        api_key: API_KEY,
      });
      const url = `${api.baseURL}${endPoint}?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.status_message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      throw error;
    }
  },

  movies: {
    getPopular: (params = {}) => {
      return api.fetchData("/movie/popular", {
        language: "ko-KR",
        page: 1,
        ...params,
      });
    },
  },
};

export default api;
