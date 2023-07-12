const API_URL = "https://api.themoviedb.org/3";

const API_KEY_3 = process.env.REACT_APP_API_KEY_3;

// const API_KEY_4 = process.env.REACT_APP_API_KEY_4;

export default class ApiService {
  getAuthentication = async () => {
    const response = await fetch(
      `${API_URL}/authentication/token/new?api_key=${API_KEY_3}&language=uk-UA`
    );
    if (!response.ok)
      throw new Error(
        `Failed to get token. Response status: ${response.status}`
      );
    const data = await response.json();
    return data;
  };

  validateLogin = async (options) => {
    const response = await fetch(
      `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
      options
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

  createSession = async (options) => {
    const response = await fetch(
      `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
      options
    );
    if (!response.ok)
      throw new Error(
        `Failed to create session. Response status: ${response.status}`
      );
    const result = await response.json();
    return result;
  };

  deleteSession = async (options) => {
    const response = await fetch(
      `${API_URL}/authentication/session?api_key=${API_KEY_3}`,
      options
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

  getMovies = async (filters, page) => {
    const searchParams = Object.keys(filters)
      .map((filter) => {
        if (filters[filter] !== "all") return `&${filter}=${filters[filter]}`;
      })
      .join("");
    const result = await fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}${searchParams}&language=uk-UA&page=${page}`
    );
    return result;
  };

  getGenre = async () => {
    const result = await fetch(
      `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=uk-UA`
    );
    return result;
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

  getFavoriteMovies = async (account_id, options) => {
    const response = await fetch(
      `${API_URL}/account/${account_id}/favorite/movies?api_key=${API_KEY_3}&language=uk-UA`,
      options
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
