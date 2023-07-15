import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import MoviesList from "../../components/MovieList/MoviesList";
import { UserContext } from "../../contexts/userContext";

const SearchPage = () => {
  const [user] = useContext(UserContext);
  const [movies, setMovies] = useState(null);
  let { search } = useLocation();
  const { page = 1 } = useParams();

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SearchPage props >>> ", search);
    console.log("SearchPage props >>> ", page);

    if (!isLoading && !error && (search || page))
      createFetchRequest("searchMovie", [search, page]);
    // if (user.currentUser && !isLoading && !error)
    //   createFetchRequest("getWatchlistMovies", [user.currentUser.id, page]);
    // if (!error && response) {
    //   setMovies(response);
    // }
    if (!error && response) {
      setMovies(response);
      console.log("SearchPage response >>>> ", response);
    }
  }, [response, search, page]);

  const handlerPagination = (page) => {
    navigate(`/search/${page}${search}`);
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

export default SearchPage;
