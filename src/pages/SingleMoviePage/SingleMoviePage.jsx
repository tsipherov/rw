import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleMoviePage.css";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../contexts/userContext";

const SingleMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [stateMovie, setStateMovie] = useState(null);
  const { movie_id } = useParams();

  const [
    { isLoading: stateIsLoading, response: stateResponse, error: stateError },
    stateCreateFetchRequest,
  ] = useFetch();
  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const [
    { isLoading: toggleLoad, response: toggleRes, error: toggleErr },
    toggleRequest,
  ] = useFetch();
  const [user] = useContext(UserContext);

  useEffect(() => {
    console.log("SingleMoviePage stateResponse >>>> ", stateResponse);
    console.log("SingleMoviePage response >>>> ", response);
    if (movie_id && !movie && !stateResponse && !stateIsLoading) {
      createFetchRequest("getMovieDetails", [movie_id]);
    }
    if (!movie && response) {
      stateCreateFetchRequest("movieAccountStates", [movie_id]);
      setMovie(response);
    }
    if (stateResponse) {
      setStateMovie(stateResponse);
    }
  }, [movie_id, response, stateResponse, stateError, stateIsLoading]);

  useEffect(() => {
    if (toggleLoad) stateCreateFetchRequest("movieAccountStates", [movie_id]);
  }, [toggleRes, toggleLoad]);

  const addToFavoriteHandler = () => {
    toggleRequest(
      "addFavorite",
      [user.currentUser.id],
      {
        media_type: "movie",
        media_id: movie_id,
        favorite: !stateMovie.favorite,
      },
      "POST"
    );
    // stateCreateFetchRequest("movieAccountStates", [movie_id]);
  };

  const addToWatchHandler = () => {
    toggleRequest(
      "addToWatchlist",
      [user.currentUser.id],
      {
        media_type: "movie",
        media_id: movie_id,
        watchlist: !stateMovie.watchlist,
      },
      "POST"
    );
    // stateCreateFetchRequest("movieAccountStates", [movie_id]);
  };

  let content =
    movie && stateMovie ? (
      <div className="container">
        <div className="singleMoviePage">
          <h2 className="singleMovieTitle">{movie.title}</h2>
          <img
            className="singleMoviePoster"
            src={`https://image.tmdb.org/t/p/w500${
              movie.poster_path || movie.backdrop_path
            }`}
            alt={movie.original_title}
          />
          <div className="singleMovieDetails">
            <div className="singleMovieButtonsBlock">
              <button
                className={stateMovie.favorite ? "active" : null}
                onClick={addToFavoriteHandler}
                disabled={stateIsLoading && toggleLoad}
              >
                favorite
              </button>
              <button
                className={stateMovie.watchlist ? "active" : null}
                onClick={addToWatchHandler}
                disabled={stateIsLoading && toggleLoad}
              >
                watch
              </button>
            </div>
            <h3>{movie.original_title}</h3>
            <h4>{movie.tagline}</h4>
            <ul>
              <li key="production_companies_logo">
                {movie.production_companies.map((m) =>
                  m.logo_path ? (
                    <img
                      key={m.id}
                      className="singleMovieCompanyLogo"
                      src={`https://image.tmdb.org/t/p/w500${m.logo_path}`}
                    />
                  ) : null
                )}
              </li>
              <li key="release_date">
                <span className="singleMovieDetailName">release date</span>
                {movie.release_date}
              </li>
              <li key="production_companies">
                <span className="singleMovieDetailName">
                  production companies
                </span>
                <div className="singleMovieProdCompanies">
                  {movie.production_companies.map((m) => (
                    <span key={m.id} className="singleMovieProdCompany">
                      &laquo;{m.name}&raquo;
                    </span>
                  ))}
                </div>
              </li>

              <li key="production_countries">
                <span className="singleMovieDetailName">
                  production countries
                </span>
                {movie.production_countries.map((m) => (
                  <span key={m.iso_3166_1} className="singleMovieProdCountry">
                    {m.name}
                  </span>
                ))}
              </li>
              <li key="genres">
                <span className="singleMovieDetailName">genres</span>
                {movie.genres.map((m) => (
                  <span className="singleMovieGenres" key={m.id}>
                    {m.name}
                  </span>
                ))}
              </li>
              <li key="runtime">
                <span className="singleMovieDetailName">runtime</span>
                {movie.runtime} min
              </li>
              {movie.belongs_to_collection ? (
                <li key="belongs_to_collection">
                  <span className="singleMovieDetailName">
                    belongs to collection
                  </span>
                  {movie.belongs_to_collection.name}
                </li>
              ) : null}

              <li key="revenue">
                <span className="singleMovieDetailName">budget / revenue</span>$
                {movie.budget.toLocaleString("ua-UA")} / $
                {movie.revenue.toLocaleString("ua-UA")}
              </li>
              <li key="vote_average">
                <span className="singleMovieDetailName">vote average</span>
                {movie.vote_average}
              </li>
              <li key="vote_count">
                <span className="singleMovieDetailName">vote count</span>
                {movie.vote_count}
              </li>
            </ul>
          </div>
          <div className="singleMovieDescription">{movie.overview}</div>
        </div>
      </div>
    ) : null;

  return content;
};

export default SingleMoviePage;
