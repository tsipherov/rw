import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useFetch } from "../../hooks/useFetch";
import MoviesList from "../../components/MovieList/MoviesList";
import { useSelector } from "react-redux";

const WatchPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [movies, setMovies] = useState(null);
  const { page = 1 } = useParams();

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading && !error)
      createFetchRequest("getWatchlistMovies", [user.id, page]);
    if (!error && response) {
      setMovies(response);
    }
  }, [user, response, page]);

  const handlerPagination = (page) => {
    navigate(`/watch/${page}`);
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

export default WatchPage;
