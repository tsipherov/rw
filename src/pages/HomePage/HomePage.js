import React, { useEffect, useState } from "react";
import MoviesContainer from "../../components/MovieList/MoviesContainer";
import Filters from "../../components/Filters/Filters";
import ApiService from "../../services/apiService";
import { useFetch } from "../../hooks/useFetch";
import "./HomePage.css";

const HomePage = () => {
  const [genreList, setGenreList] = useState([]);
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    with_genres: "all",
    primary_release_year: "all",
  });
  const [page, setPage] = useState(1);

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();

  const service = new ApiService();

  useEffect(() => {
    service
      .getGenre()
      .then((res) => res.json())
      .then((res) => {
        setGenreList({ genreList: res.genres });
      });
  }, []);

  const handlerPagination = (page) => {
    setPage(page);
  };

  const handlerSortTabs = (value) => {
    setFilters({ ...filters, sort_by: value });
    setPage(1);
  };

  const handlerGenres = (value) => {
    setFilters({ ...filters, with_genres: value });
    setPage(1);
  };

  const handlerReleaseYear = (value) => {
    setFilters({ ...filters, primary_release_year: value });
    setPage(1);
  };

  return (
    <div className="container-xxl">
      <div className="row my-3 px-3">
        <Filters
          genreList={genreList}
          handlerSortTabs={handlerSortTabs}
          handlerGenres={handlerGenres}
          handlerReleaseYear={handlerReleaseYear}
        />

        <MoviesContainer
          handlerPagination={handlerPagination}
          filters={filters}
          page={page}
        />
      </div>
    </div>
  );
};

export default HomePage;
