import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import Pagination from "../Pagination/Pagination";
import PropTypes from "prop-types";
import "./MoviesList.css";

const MoviesList = ({ movies, page, handlerPagination }) => {
  return (
    <div className="d-flex filmsList col-8 mb-5">
      {movies.map((movie) => (
        <div className="film-card" key={movie.id}>
          <MovieItem
            data={movie}
            // handle={this.handleDelete}
            // handlerWillWatch={this.handlerWillWatchAdd}
            // handlerRemoveWillWatch={this.handlerWillWatchRemove}
          />
        </div>
      ))}
      <div className="d-flex row w-100 py-5">
        <Pagination handler={handlerPagination} currentPage={page} />
      </div>
    </div>
  );
};

MoviesList.defaultProps = {
  movies: [],
  page: 1,
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  page: PropTypes.number,
  handlerPagination: PropTypes.func.isRequired,
};

export default MoviesList;
