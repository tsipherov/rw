import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiService from "../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleMovie,
  fetchSingleMovieCollection,
  fetchStateSingleMovie,
  fetchTrailer,
  setDefaultCollection,
  toggleStateMovie,
} from "../../store/slices/singleMovie.slice";
import "./SingleMoviePage.css";
import { updateFilters } from "../../store/slices/filters.slice";

const SingleMoviePage = () => {
  const { movie_id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { movieLoading, movie, stateMovie, collection, loading, videoLink } =
    useSelector((state) => state.singleMovie);

  const apiService = new ApiService();

  useEffect(() => {
    dispatch(fetchSingleMovie(movie_id));
    dispatch(fetchStateSingleMovie(movie_id));
    dispatch(fetchTrailer(movie_id));
    // eslint-disable-next-line
  }, [movie_id]);

  useEffect(() => {
    if (movie && movie.belongs_to_collection) {
      dispatch(fetchSingleMovieCollection(movie.belongs_to_collection.id));
    } else {
      dispatch(setDefaultCollection());
    }
  }, [movie]);

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
      <div className="pageContainer">
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
                      src={`https://image.tmdb.org/t/p/w154${m.logo_path}`}
                      alt={m}
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
                <div className="detailContainer">
                  {movie.production_companies.map((m) => (
                    <span key={m.id}>&laquo;{m.name}&raquo;</span>
                  ))}
                </div>
              </li>

              <li key="production_countries">
                <span className="singleMovieDetailName">
                  production countries
                </span>
                <div className="detailContainer">
                  {movie.production_countries.map((m) => (
                    <span key={m.iso_3166_1} className="singleMovieProdCountry">
                      {m.name}
                    </span>
                  ))}
                </div>
              </li>
              <li key="genres">
                <span className="singleMovieDetailName">genres</span>
                <div className="detailContainer">
                  {movie.genres.map((m) => (
                    <Link
                      to={`/`}
                      onClick={() => {
                        dispatch(
                          updateFilters({ filter: "with_genres", value: m.id })
                        );
                      }}
                      key={m.id}
                    >
                      {m.name}
                    </Link>
                  ))}
                </div>
              </li>
              <li key="runtime">
                <span className="singleMovieDetailName">runtime</span>
                {movie.runtime} min
              </li>
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

          {collection ? (
            <div className="singleMovieCollection">
              <h3 className="singleMovieDetailName">{collection.name}</h3>
              <p>{collection.overview}</p>
              <div className="collectionCardsContainer">
                {collection.parts.map((part) => (
                  <Link to={`/movie/${part.id}`} className="collectionCard">
                    <img
                      // className="singleMoviePoster"
                      src={`https://image.tmdb.org/t/p/w92${
                        part.poster_path || part.backdrop_path
                      }`}
                      alt={part.original_title}
                    />
                    <h5>{part.title}</h5>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          <div className="singleMovieDescription">{movie.overview}</div>
          {videoLink ? (
            <iframe
              // width="1080"
              // height="607"
              src={`https://www.youtube.com/embed/${videoLink}`}
              title="YouTube video player"
              // frameborder="0"
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
