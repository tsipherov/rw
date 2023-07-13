import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import MoviesList from "../../components/MovieList/MoviesList";
import { useFetch } from "../../hooks/useFetch";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [user] = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();

  useEffect(() => {
    if (user.currentUser && !isLoading && !error)
      createFetchRequest("getFavoriteMovies", [user.currentUser.id, page]);
    if (!error && response) {
      setMovies(response.results);
    }
  }, [user, response, page]);

  const handlerPagination = (page) => {
    setPage(page);
  };

  return (
    <div className="container-xxl">
      <MoviesList movies={movies} handlerPagination={handlerPagination} />;
    </div>
  );
};

export default FavoritesPage;
