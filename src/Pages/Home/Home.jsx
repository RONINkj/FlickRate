import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import GenreMovieList from "./GenreMovieList";

function Home() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=9a74db84a98e27257a0f5b7f83b21e02"
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <Slider />
      <GenreMovieList movies={movies} />
    </div>
  );
}

export default Home;
