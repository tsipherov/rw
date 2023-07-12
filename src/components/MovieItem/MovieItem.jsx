import React, { useState } from "react";
import "./MovieItem.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Image(props) {
  let { data } = props;
  return (
    <img
      className="card-img-top"
      src={`https://image.tmdb.org/t/p/w500${
        data.poster_path || data.backdrop_path
      }`}
      alt={data.original_title}
    />
  );
}

const MovieItem = ({
  data,
  handle,
  handlerWillWatch,
  handlerRemoveWillWatch,
}) => {
  const [movie, setMovie] = useState(data);
  const [showOverview, setShowOverview] = useState(false);
  const [like, setLike] = useState(false);
  const [willWatch, setWillWatch] = useState(false);

  const navigate = useNavigate();

  const toggleOverview = () => {
    this.setState({
      showOverview: !this.state.showOverview,
    });
  };

  const handleLike = () => {
    setLike(!like);
  };

  const toDetailPageHandler = (movie_id) => {
    console.log("movie_id >>>> ", movie_id);
    navigate(`/movie/${movie_id}`);
  };

  let { title, vote_average, overview, release_date, id, ...imgData } = movie;

  return (
    <div className="card" onClick={() => toDetailPageHandler(id)}>
      <Image data={imgData} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="d-flex justify-content-between">
          <div>
            <p className="card-text">Rating: {vote_average}</p>
            <p className="card-text">{release_date}</p>
          </div>
          {handlerWillWatch ? (
            <button
              type="button"
              onClick={() => {
                if (!willWatch) {
                  handlerWillWatch(movie);
                } else {
                  handlerRemoveWillWatch(movie);
                }
                setWillWatch(!willWatch);
              }}
              className={`btn ${
                willWatch ? "btn-warning" : "btn-info"
              } btn-sm btn-watch`}
            >
              {willWatch ? "Not watch" : "Will watch"}
            </button>
          ) : null}
        </div>
        {showOverview ? <p className="card-text">{overview}</p> : null}

        {handle ? (
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={toggleOverview}
            >
              {showOverview ? "Hide overview" : "Show overview"}
            </button>
            <button
              type="button"
              onClick={handleLike}
              className={
                like ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"
              }
            >
              Like
            </button>
            <button
              type="button"
              onClick={() => {
                handle(id);
              }}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MovieItem;
