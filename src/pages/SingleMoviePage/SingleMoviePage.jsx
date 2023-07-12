import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/apiService";
import "./SingleMoviePage.css";

const SingleMoviePage = (props) => {
  console.log("props >>>> ", props);
  const [movie, setMovie] = useState(null);
  const { movie_id } = useParams();
  const apiService = new ApiService();

  useEffect(async () => {
    const response = await apiService.getMovieDetails(movie_id);
    console.log("response >>>> ", response);
    setMovie(response);
  }, [movie_id]);
  let content = movie ? (
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
          <h3>{movie.original_title}</h3>
          <h4>{movie.tagline}</h4>
          <ul>
            <li>
              {/* <span className="singleMovieDetailName">release date</span> */}
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
            <li>
              <span className="singleMovieDetailName">release date</span>
              {movie.release_date}
            </li>
            <li>
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

            <li>
              <span className="singleMovieDetailName">
                production countries
              </span>
              {movie.production_countries.map((m) => (
                <span key={m.id} className="singleMovieProdCountry">
                  {m.name}
                </span>
              ))}
            </li>
            <li>
              <span className="singleMovieDetailName">genres</span>
              {movie.genres.map((m) => (
                <span className="singleMovieGenres" key={m.id}>
                  {m.name}
                </span>
              ))}
            </li>
            <li>
              <span className="singleMovieDetailName">runtime</span>
              {movie.runtime} min
            </li>
            {movie.belongs_to_collection ? (
              <li>
                <span className="singleMovieDetailName">
                  belongs to collection
                </span>
                {movie.belongs_to_collection.name}
              </li>
            ) : null}

            <li>
              <span className="singleMovieDetailName">budget / revenue</span>$
              {movie.budget.toLocaleString("ua-UA")} / $
              {movie.revenue.toLocaleString("ua-UA")}
            </li>
            <li>
              <span className="singleMovieDetailName">vote average</span>
              {movie.vote_average}
            </li>
            <li>
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
