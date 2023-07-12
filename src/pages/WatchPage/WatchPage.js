import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import ApiService from "../../services/apiService";
import MoviesList from "../../components/MovieList/MoviesList";

const API_KEY_4 = process.env.REACT_APP_API_KEY_4;

const WatchPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [moviesList, setMoviesList] = useState([]);

  const apiService = new ApiService();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY_4}`,
    },
  };

  useEffect(async () => {
    console.log("user >>>> ", user);
    if (user) {
      const favorList = await apiService.getWatchlistMovies(
        user.currentUser.id,
        options
      );
      console.log("favorList", favorList);
      setMoviesList(favorList.results);
    }
  }, [user]);
  return (
    <div className="container-xxl">
      <MoviesList movies={moviesList} handlerPagination={() => {}} />;
    </div>
  );
};

export default WatchPage;
