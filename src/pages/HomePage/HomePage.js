import React, { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import { useFetch } from "../../hooks/useFetch";
import MoviesList from "../../components/MovieList/MoviesList";
import "./HomePage.css";
import { useNavigate, useParams } from "react-router-dom";

const HomePage = () => {
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    with_genres: "all",
    primary_release_year: "all",
  });
  const [movies, setMovies] = useState(null);
  const { page = 1 } = useParams();
  // const [page, setPage] = useState(1);

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !error) createFetchRequest("getMovies", [filters, page]);

    if (!error && response) {
      setMovies(response);
    }
  }, [response, filters, page]);

  const handlerPagination = (page) => {
    // setPage(page);
    navigate(`/movies/${page}`);
  };

  const filtersHandler = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
    navigate(`/movies/1`);
    // setPage(1);
  };

  return (
    <div className="container-xxl">
      <div className="row my-3 px-3">
        <Filters filtersHandler={filtersHandler} />

        {movies ? (
          <MoviesList
            handlerPagination={handlerPagination}
            data={movies}
            page={+page}
          />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
