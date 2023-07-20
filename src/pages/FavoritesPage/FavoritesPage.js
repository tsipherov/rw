import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import MoviesList from "../../components/MovieList/MoviesList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteMovies } from "../../store/slices/favorites.slice";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [user] = useContext(UserContext);
  const { page = 1 } = useParams();
  const { entities: movies, loading } = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchFavoriteMovies({ serviceProps: [user?.currentUser?.id, page] })
    );
  }, [page, user]);

  const handlerPagination = (page) => {
    navigate(`/favorites/${page}`);
  };
  console.log("movies >>>> ", movies);

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
