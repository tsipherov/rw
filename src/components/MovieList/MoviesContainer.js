import React, { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import MoviesList from "./MoviesList";

const MoviesContainer = ({ filters, page, handlerPagination }) => {
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
  return (
    <MoviesList
      handlerPagination={handlerPagination}
      page={page}
      movies={movies}
    />
  );
};

export default MoviesContainer;
