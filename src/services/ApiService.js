const API_URL = "https://api.themoviedb.org/3";

const API_KEY_3 = process.env.REACT_APP_API_KEY_3;

const API_KEY_4 = process.env.REACT_APP_API_KEY_4;

const createFetchOptions = (bodyData = null, httpMethod = "GET") => {
  const requestOptions = {
    method: httpMethod,
    mode: "cors",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${API_KEY_4}`,
    },
  };

  if (bodyData) {
    requestOptions.body = JSON.stringify({
      ...bodyData,
    });
  }
  return requestOptions;
};

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

  getMovieDetails = async ({ serviceProps, reqOptions }) => {
    const [movie_id] = serviceProps;
    const response = await fetch(
      `${API_URL}/movie/${movie_id}?language=uk-UA`,
      reqOptions
    );
    const result = await response.json();
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

  addFavorite = async ({ serviceProps, reqOptions }) => {
    console.log("addFavorite method serviceProps >>>> ", serviceProps);
    console.log("addFavorite method reqOptions >>>> ", reqOptions);
    const [account_id] = serviceProps;
    const response = await fetch(
      `${API_URL}/account/${account_id}/favorite`,
      reqOptions
    );
    const result = await response.json();
    return result;
  };

  getWatchlistMovies = async ({ serviceProps, reqOptions }) => {
    const [account_id, page] = serviceProps;
    const response = await fetch(
      `${API_URL}/account/${account_id}/watchlist/movies?page=${page}&language=uk-UA`,
      reqOptions
    );
    const result = await response.json();
    return result;
  };

  addToWatchlist = async ({ serviceProps, reqOptions }) => {
    console.log("addFavorite method serviceProps >>>> ", serviceProps);
    console.log("addFavorite method reqOptions >>>> ", reqOptions);
    const [account_id] = serviceProps;
    const response = await fetch(
      `${API_URL}/account/${account_id}/watchlist`,
      reqOptions
    );
    const result = await response.json();
    return result;
  };

  movieAccountStates = async ({ serviceProps, reqOptions }) => {
    // console.log("addFavorite method serviceProps >>>> ", serviceProps);
    // console.log("addFavorite method reqOptions >>>> ", reqOptions);
    const [movie_id] = serviceProps;
    const response = await fetch(
      `${API_URL}/movie/${movie_id}/account_states`,
      reqOptions
    );
    const result = await response.json();
    return result;
  };

  searchMovie = async ({ serviceProps, reqOptions }) => {
    // console.log("addFavorite method serviceProps >>>> ", serviceProps);
    // console.log("addFavorite method reqOptions >>>> ", reqOptions);
    const [searchQuery, page] = serviceProps;
    const response = await fetch(
      `${API_URL}/search/movie${searchQuery}&page=${page}&language=uk-UA`,
      reqOptions
    );
    const result = await response.json();
    return result;
  };

  getVideo = async ({ serviceProps, reqOptions }) => {
    // console.log("addFavorite method serviceProps >>>> ", serviceProps);
    // console.log("addFavorite method reqOptions >>>> ", reqOptions);
    const [movie_id] = serviceProps;
    const response = await fetch(
      `${API_URL}/movie/${movie_id}/videos`,
      reqOptions
    );
    const result = await response.json();
    if (!response.ok)
      throw new Error(
        `${result.status_message} Status code: ${result.status_code}`
      );
    return result;
  };

  getCollectionDetails = async (collection_id) => {
    // console.log("addFavorite method serviceProps >>>> ", serviceProps);

    const response = await fetch(
      `${API_URL}/collection/${collection_id}?api_key=${API_KEY_3}`
    );
    const result = await response.json();
    if (!response.ok)
      throw new Error(
        `${result.status_message} Status code: ${result.status_code}`
      );
    return result;
  };
}

export const getGenres = async () => {
  const response = await fetch(
    `${API_URL}/genre/movie/list?language=uk-UK`,
    createFetchOptions()
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`${data.status_message} Status code: ${data.status_code}`);
  }
  return data;
};
