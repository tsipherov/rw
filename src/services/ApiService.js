const API_URL = "https://api.themoviedb.org/3";

const API_KEY_3 = process.env.REACT_APP_API_KEY_3;

// const API_KEY_4 = process.env.REACT_APP_API_KEY_4;

export default class ApiService {
  getAuthentication = async ({ reqOptions }) => {
    const response = await fetch(
      `${API_URL}/authentication/token/new`,
      reqOptions
    );
    if (!response.ok)
      throw new Error(
        `Failed to get token. Response status: ${response.status}`
      );
    const data = await response.json();
    return data;
  };

  validateLogin = async ({ reqOptions }) => {
    const response = await fetch(
      `${API_URL}/authentication/token/validate_with_login`,
      reqOptions
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `${data.status_message} Status code: ${data.status_code}`
      );
    }
    const result = { validateLogin: data.success };
    return result;
  };

  createSession = async ({ reqOptions }) => {
    const response = await fetch(
      `${API_URL}/authentication/session/new`,
      reqOptions
    );
    if (!response.ok)
      throw new Error(
        `Failed to create session. Response status: ${response.status}`
      );
    const result = await response.json();
    return result;
  };

  deleteSession = async ({ reqOptions }) => {
    const response = await fetch(
      `${API_URL}/authentication/session`,
      reqOptions
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `${data.status_message} Status code: ${data.status_code}`
      );
    }
    return data;
  };

  getAccountDetails = async (session_id) => {
    const response = await fetch(
      `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
    );
    const result = await response.json();
    return result;
  };

  getMovies = async ({ serviceProps, reqOptions }) => {
    console.log("getMovies serviceProps  >>> ", serviceProps);
    const [filters, page] = serviceProps;
    const searchParams = Object.keys(filters)
      .map((filter) => {
        if (filters[filter] !== "all") return `&${filter}=${filters[filter]}`;
      })
      .join("");
    const response = await fetch(
      `${API_URL}/discover/movie?page=${page}${searchParams}&language=uk-UA`,
      reqOptions
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(
        `${data.status_message} Status code: ${data.status_code}`
      );
    }
  };

  getGenre = async ({ reqOptions }) => {
    const response = await fetch(
      `${API_URL}/genre/movie/list?language=uk-UK`,
      reqOptions
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(
        `${data.status_message} Status code: ${data.status_code}`
      );
    }
  };

  getMovieDetails = async (movie_id) => {
    const response = await fetch(
      `${API_URL}/movie/${movie_id}?api_key=${API_KEY_3}&language=uk-UA`
    );
    const result = response.json();
    if (!response.ok)
      throw new Error(
        `${result.status_message} Status code: ${result.status_code}`
      );
    return result;
  };

  getFavoriteMovies = async ({ serviceProps, reqOptions }) => {
    const [account_id, page] = serviceProps;
    const response = await fetch(
      `${API_URL}/account/${account_id}/favorite/movies?page=${page}&language=uk-UA`,
      reqOptions
    );
    const result = await response.json();
    return result;
  };

  getWatchlistMovies = async (account_id, options) => {
    const response = await fetch(
      `${API_URL}/account/${account_id}/watchlist/movies?api_key=${API_KEY_3}&language=uk-UA`,
      options
    );
    const result = await response.json();
    return result;
  };
}
