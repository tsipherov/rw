import React, { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import { useFetch } from "../../hooks/useFetch";
import MoviesList from "../../components/MovieList/MoviesList";
import "./HomePage.css";

const HomePage = () => {
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    with_genres: "all",
    primary_release_year: "all",
  });
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();

  useEffect(() => {
    if (!isLoading && !error) createFetchRequest("getMovies", [filters, page]);

    if (!error && response) {
      setMovies(response.results);
    }
  }, [response, filters, page]);

  const handlerPagination = (page) => {
    setPage(page);
  };

  const filtersHandler = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
    setPage(1);
  };

  return (
    <div className="container-xxl">
      <div className="row my-3 px-3">
        <Filters filtersHandler={filtersHandler} />

        <MoviesList
          handlerPagination={handlerPagination}
          movies={movies}
          page={page}
        />
      </div>
    </div>
  );
};

export default HomePage;
