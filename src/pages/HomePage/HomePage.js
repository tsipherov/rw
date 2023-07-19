import React, { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import { useFetch } from "../../hooks/useFetch";
import MoviesList from "../../components/MovieList/MoviesList";
import "./HomePage.css";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const filters = useSelector((state) => state.filters);
  const [movies, setMovies] = useState(null);
  const { page = 1 } = useParams();

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !error) createFetchRequest("getMovies", [filters, page]);

    if (!error && response) {
      setMovies(response);
    }
  }, [response, filters, page]);

  useEffect(() => {
    // navigate(`/movies/1`);
    return redirect("/movies/1");
  }, [filters]);

  const handlerPagination = (page) => {
    navigate(`/movies/${page}`);
  };

  return (
    <div className="container-xxl">
      <div className="row my-3 px-3">
        <Filters />
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
