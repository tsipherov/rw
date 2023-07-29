import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./pages/Auth/Auth";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import WatchPage from "./pages/WatchPage/WatchPage";
import { UserProvider } from "./contexts/userContext";
import SingleMoviePage from "./pages/SingleMoviePage/SingleMoviePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { useLocalStorage } from "./hooks/useLocalStogage";
import { fetchUser } from "./store/slices/auth.slice";
import "./App.css";

const App = () => {
  const [session_id] = useLocalStorage("session_id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (session_id) dispatch(fetchUser(session_id));
  }, []);

  return (
    <UserProvider>
      <BrowserRouter basename="/rw">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/movies/1" />}
            action={async () => {
              console.log("Hello from router");
            }}
          />
          <Route path="/movies/:page" element={<HomePage />} />
          <Route path="/movie/:movie_id" element={<SingleMoviePage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/favorites/:page?" element={<FavoritesPage />} />
          <Route path="/watch/:page?" element={<WatchPage />} />
          <Route path="/search/:page?" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
