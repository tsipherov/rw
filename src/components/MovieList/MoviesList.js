import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import Pagination from "../Pagination/Pagination";
import PropTypes from "prop-types";
import "./MoviesList.css";

const MoviesList = ({ data, page, handlerPagination }) => {
  console.log("data >>>>>> ", data);
  const { results: movies, total_pages } = data;
  console.log("movies >>>>>> ", movies);
  return (
    <div className="d-flex filmsList col-10 mb-5">
      {movies.map((movie) => (
        <div className="film-card" key={movie.id}>
          <MovieItem data={movie} />
        </div>
      ))}
      <div className="d-flex row w-100 py-5">
        <Pagination
          handler={handlerPagination}
          currentPage={page}
          maxPage={total_pages}
        />
      </div>
    </div>
  );
};

MoviesList.defaultProps = {
  data: {
    results: [],
    total_pages: 1,
  },
  page: 1,
};

MoviesList.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.array,
    total_pages: PropTypes.number,
  }).isRequired,
  page: PropTypes.number,
  handlerPagination: PropTypes.func.isRequired,
};

export default MoviesList;
