const API_KEY = process.env.REACT_APP_API_KEY;

const api = {
  baseURL: "https://api.themoviedb.org/3",

  fetchData: async (endPoint) => {
    try {
      const res = await fetch(`${api.baseURL}${endPoint}?api_key=${API_KEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
export default api;
