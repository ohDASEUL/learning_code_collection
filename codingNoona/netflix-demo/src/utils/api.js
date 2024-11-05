const API_KEY = process.env.REACT_APP_API_KEY;

const api = {
  baseURL: "https://api.themoviedb.org/3",

  fetchData: async (endpoint) => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    try {
      const res = await fetch(`${api.baseURL}${endpoint}`, options);
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
