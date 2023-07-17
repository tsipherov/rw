import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import MoviesList from "../../components/MovieList/MoviesList";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [user] = useContext(UserContext);
  const [movies, setMovies] = useState(null);
  const { page = 1 } = useParams();

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.currentUser && !isLoading && !error)
      createFetchRequest("getFavoriteMovies", [user.currentUser.id, page]);
    if (!error && response) {
      setMovies(response);
    }
  }, [user, response, page]);

  const handlerPagination = (page) => {
    navigate(`/favorites/${page}`);
  };

  return (
    <div className="container-xxl">
      {movies ? (
        <MoviesList
          handlerPagination={handlerPagination}
          data={movies}
          page={+page}
        />
      ) : null}
    </div>
  );
};

export default FavoritesPage;
