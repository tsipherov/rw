import React, { useEffect } from "react";
import MoviesList from "../../components/MovieList/MoviesList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteMovies } from "../../store/slices/favorites.slice";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const user = useSelector((state) => state.auth.user);
  const { page = 1 } = useParams();
  const { entities: movies, loading } = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(fetchFavoriteMovies({ serviceProps: [user.id, page] }));
  }, [page, user]);

  const handlerPagination = (page) => {
    navigate(`/favorites/${page}`);
  };

  return (
    <div className="container-xxl">
      {loading === "succeeded" ? (
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
