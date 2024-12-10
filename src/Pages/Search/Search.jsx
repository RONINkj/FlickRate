import React, { useState } from "react";
import "./search.css";
import { Link } from "react-router-dom";

function Search() {
  const API_KEY = "8ced6945a7e09b727e402aeea212a29b";
  const [movies, setMovies] = useState([]);
  const [actorName, setActorName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filmTitle, setFilmTitle] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&`;
      if (actorName) {
        const actorResponse = await fetch(
          `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorName}`
        );
        const actorData = await actorResponse.json();
        if (actorData.results.length > 0) {
          const actorId = actorData.results[0].id;
          url += `with_cast=${actorId}&`;
        }
      }
      if (selectedGenre) {
        url += `with_genres=${selectedGenre}&`;
      }
      if (filmTitle) {
        url += `query=${filmTitle}&`;
      }
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="input"
          type="text"
          placeholder="Actor Name"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
        />
        <select
          className="select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="27">Horror</option>
        </select>
        <input
          className="input"
          type="text"
          placeholder="Film Title"
          value={filmTitle}
          onChange={(e) => setFilmTitle(e.target.value)}
        />
        <button className="button" type="submit" >
          Search
        </button>
      </form>
      <div className="movies">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            style={{ textDecoration: "none" }}
            // onClick={() => handleEvent(movie.genre_ids)}
          >
            <div key={movie.id} className="movie">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
