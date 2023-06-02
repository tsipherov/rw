import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import HomePage from "../pages/HomePage/HomePage";
import Auth from "../pages/Auth/Auth";
import "../App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
