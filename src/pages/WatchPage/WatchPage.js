import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MoviesList from "../../components/MovieList/MoviesList";
import { fetchWatchList } from "../../store/slices/watch.slice";

const WatchPage = () => {
  const user = useSelector((state) => state.auth.user);
  const { entities: movies, loading } = useSelector((state) => state.watchList);
  const { page = 1 } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(fetchWatchList([user.id, page]));
  }, [user, page]);

  const handlerPagination = (page) => {
    navigate(`/watch/${page}`);
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

export default WatchPage;
