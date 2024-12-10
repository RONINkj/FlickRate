import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourite from "./Pages/Favourite/Favourite";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";
import Movie from "./Pages/Movie/Movie";
import Search from "./Pages/Search/Search";
import TVSHOWS from "./Pages/TVSHOWS/TVSHOWS";
import LOGIN from "./Pages/LOGIN/LOGIN";
import Signup from "./Pages/Signup/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import DetailsTv from "./Pages/Details/DetailsTv";

function App() {
  return (
    <AuthContextProvider>
      <div className="">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="movies/:id" element={<Details />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="zembedi/:id" element={<DetailsTv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tvshows" element={<TVSHOWS />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
