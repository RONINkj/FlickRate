import React, { useEffect, useState, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const screenWidth = window.innerWidth;

function Slider() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const elementRef = useRef();

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      // Select a random movie from the fetched movies
      const randomIndex = Math.floor(Math.random() * movies.length);
      setSelectedMovie(movies[randomIndex]);
    }
  }, [movies]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=9a74db84a98e27257a0f5b7f83b21e02"
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const sliderRight = () => {
    const currentIndex = movies.findIndex(
      (movie) => movie.id === selectedMovie.id
    );
    const nextIndex = (currentIndex + 1) % movies.length;
    setSelectedMovie(movies[nextIndex]);
  };

  const sliderLeft = () => {
    const currentIndex = movies.findIndex(
      (movie) => movie.id === selectedMovie.id
    );
    const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
    setSelectedMovie(movies[prevIndex]);
  };

  return (
    <div style={{ width: `${screenWidth}px`, position: "relative" }}>
      <HiChevronLeft
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer z-10"
        onClick={sliderLeft}
      />
      <HiChevronRight
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0 z-10"
        onClick={sliderRight}
      />

      <div
        className="flex overflow-x-auto w-full h-[550px] text-white "
        ref={elementRef}
      >
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          {selectedMovie && (
            <img
              className="w-full h-full object-cover p-0"
              src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
          )}
          <div className="absolute w-full top-[25%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">
              {selectedMovie?.title}
            </h1>
            <p className="text-gray-400 text-sm py-3">
              Released: {selectedMovie?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {selectedMovie?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
