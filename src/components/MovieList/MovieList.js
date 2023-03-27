import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import MovieItem from "../MovieItem/MovieItem";

const MovieList = ({ filters, sort_by, page }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const apiService = new ApiService();

  useEffect(() => {
    apiService
      .getMovies(filters, page)
      .then((data) => data.json())
      .then((data) => {
        setMovies(data.results);
        console.log("data getMovies >>> ", data);
      })
      .catch((error) => setError(error));
    // eslint-disable-next-line
  }, [filters, page]);

  if (error) return error;
  return movies.map((movie) => (
    <div className="align-self-stretch" key={movie.id}>
      <MovieItem
        data={movie}
        // handle={this.handleDelete}
        // handlerWillWatch={this.handlerWillWatchAdd}
        // handlerRemoveWillWatch={this.handlerWillWatchRemove}
      />
    </div>
  ));
};

export default MovieList;
