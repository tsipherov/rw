import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./pages/Auth/Auth";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import WatchPage from "./pages/WatchPage/WatchPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Auth />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="watch" element={<WatchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
