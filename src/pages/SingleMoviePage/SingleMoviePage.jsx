import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleMovie,
  fetchStateSingleMovie,
  fetchTrailer,
  setDefaultState,
  toggleStateMovie,
} from "../../store/slices/singleMovie.slice";
import "./SingleMoviePage.css";

const SingleMoviePage = () => {
  const { movie_id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { movieLoading, movie, stateMovie, loading, videoLink } = useSelector(
    (state) => state.singleMovie
  );

  const apiService = new ApiService();

  useEffect(() => {
    console.log("Single Movie Page useEffect works!!!!");
    // dispatch(setDefaultState());
    dispatch(fetchSingleMovie(movie_id));
    dispatch(fetchStateSingleMovie(movie_id));
    dispatch(fetchTrailer(movie_id));
  }, []);

  // useEffect(() => {
  //   console.log("Single Movie Page getVideo works!!!!");
  // }, [stateMovie]);

  const toggleStateMovieHandler = (prop) => {
    const reqOptions = {
      bodyData: {
        media_type: "movie",
        media_id: movie_id,
        [prop]: !stateMovie[prop],
      },
      httpMethod: "POST",
    };
    const account_id = user.id;
    dispatch(toggleStateMovie({ prop, account_id, movie_id, reqOptions }));
  };

  let content =
    movieLoading === "succeeded" ? (
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
            {stateMovie ? (
              <div className="singleMovieButtonsBlock">
                {movie.adult ? <div className="adult">18+</div> : null}

                <button
                  title="Add to favorite"
                  className={stateMovie.favorite ? "active" : null}
                  onClick={() => {
                    toggleStateMovieHandler("favorite");
                  }}
                  disabled={loading === "pending"}
                >
                  <i className="bi bi-heart" />
                </button>
                <button
                  title="Add to watch list"
                  className={stateMovie.watchlist ? "active" : null}
                  onClick={() => {
                    toggleStateMovieHandler("watchlist");
                  }}
                  disabled={loading === "pending"}
                >
                  <i className="bi bi-bookmark-plus" />
                </button>
              </div>
            ) : null}
            <h3 className="singleMovieOriginalTitle">{movie.original_title}</h3>
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
                  <span
                    className="singleMovieDetailName"
                    onClick={() => {
                      apiService
                        .getCollectionDetails(movie.belongs_to_collection.id)
                        .then((res) =>
                          console.log("belongs_to_collection >>>>> ", res)
                        );
                    }}
                  >
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
          {videoLink ? (
            <iframe
              width="1080"
              height="607"
              src={`https://www.youtube.com/embed/${videoLink}`}
              title="YouTube video player"
              // frameborder="5"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : null}
        </div>
      </div>
    ) : null;

  return content;
};

export default SingleMoviePage;
