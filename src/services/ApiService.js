const API_URL = "https://api.themoviedb.org/3";

const API_KEY_3 = process.env.REACT_APP_API_KEY_3;

// const API_KEY_4 = process.env.REACT_APP_API_KEY_4;

export default class ApiService {
  getMovies = async (sort_by, page) => {
    const result = await fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${sort_by}&language=uk-UA&page=${page}`
    );
    return result;
  };

  getTest = async () => {
    const result = await fetch(
      `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=uk-UA`
    );
    return result;
  };

  getMovieDetails = async (movie_id) => {
    const result = await fetch(
      `${API_URL}/movie/${movie_id}?api_key=${API_KEY_3}&language=uk-UA`
    );
    return result;
  };
}
