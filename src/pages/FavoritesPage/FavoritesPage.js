import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import ApiService from "../../services/apiService";
import MoviesList from "../../components/MovieList/MoviesList";

const FavoritesPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [moviesList, setMoviesList] = useState([]);

  const apiService = new ApiService();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTFhNjQ1YmNhY2I3Y2Y5ZTU5OWU5NjMwODBmMjM3ZSIsInN1YiI6IjY0MjA4ZThkMDhjZjg3MDBkZWZlNzJiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SOguiOTPWAoqq0EvtYX1MFzTXw2xghU9Hv8BZEaOjS0",
    },
  };

  useEffect(async () => {
    console.log("user >>>> ", user);
    if (user) {
      const favorList = await apiService.getFavoriteMovies(
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

export default FavoritesPage;
