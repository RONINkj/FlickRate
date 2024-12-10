import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function MovieList({ genreId, index_ }) {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef(null);

  useEffect(() => {
    getMovieByGenreId();
  }, []);

  const getMovieByGenreId = () => {
    GlobalApi.getMovieByGenreId(genreId).then((resp) => {
      setMovieList(resp.data.results);
    });
  };

  const slideRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += 500; // Adjust the scroll amount as needed
    }
  };

  const slideLeft = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= 500; // Adjust the scroll amount as needed
    }
  };

  const handleLikeToggle = (id) => {
    const updatedList = movieList.map((item, index) => {
      if (index === id) {
        return { ...item, liked: !item.liked };
      }
      return item;
    });
    setMovieList(updatedList);
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4"></h2>
      <div className="relative">
        <div
          id="slider"
          className="w-full h-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-none"
          ref={elementRef}
        >
          {movieList.map((item, id) => (
            <Link to={`/movies/${item.id}`}>
              <div
                key={id}
                className="inline-block cursor-pointer relative p-2"
              >
                <img
                  className="w-40 h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-cyan-950 opacity-100 text-white">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="absolute top-0 bottom-0 left-0 ml-2 bg-gray-800 text-white rounded-full p-2 z-10"
          onClick={slideLeft}
        >
          <IoChevronBackOutline />
        </button>
        <button
          className="absolute top-0 bottom-0 right-0 mr-2 bg-gray-800 text-white rounded-full p-2 z-10"
          onClick={slideRight}
        >
          <IoChevronForwardOutline />
        </button>
      </div>
    </>
  );
}

export default MovieList;
