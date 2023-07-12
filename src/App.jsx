import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./pages/Auth/Auth";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import WatchPage from "./pages/WatchPage/WatchPage";
import { UserProvider } from "./contexts/userContext";
import "./App.css";
import SingleMoviePage from "./pages/SingleMoviePage/SingleMoviePage";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movie_id" element={<SingleMoviePage />} />
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="watch" element={<WatchPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
