import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./pages/Auth/Auth";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import WatchPage from "./pages/WatchPage/WatchPage";
import { UserProvider } from "./contexts/userContext";
import "./App.css";
import SingleMoviePage from "./pages/SingleMoviePage/SingleMoviePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/movies/1" />} />
            <Route path="/movies/:page" element={<HomePage />} />
            <Route path="/movie/:movie_id" element={<SingleMoviePage />} />
            <Route path="login" element={<Auth />} />
            <Route path="register" element={<Auth />} />
            <Route path="/favorites/:page?" element={<FavoritesPage />} />
            <Route path="watch/:page?" element={<WatchPage />} />
            <Route path="/search/:page?" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
};

export default App;
