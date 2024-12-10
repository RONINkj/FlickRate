import React, { useEffect, useState } from 'react';
import Moviepagecard from '../../Components/Moviepagecard';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../Utility/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
function Movie() {

  const { user, logIn } = UserAuth(); // Destructure user and logIn from UserAuth

  const [popularMovies, setPopularMovies] = useState([]);
  const [topratedMovies, setTopratedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);


  const handleAddToFavourite = async (id, original_title, poster_path) => {
  if (user) {
    try {
      // Add favorite movie to Firestore database
      const favoriteItem = { id, original_title, poster_path, type: 'movie' };
      const userDocRef = doc(db, 'users', `${user?.email}`);
      await updateDoc(userDocRef, {
        savedShows: arrayUnion(favoriteItem),
        
        id: id,
        name: original_title,
        poster_path: poster_path
      });
    } catch (error) {
      console.error('Error adding favorite to Firestore:', error);
    }
  } else {
    alert('Please log in to save a movie.');
    logIn(); // Redirect to login page
  }
};


  const getPopularMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setPopularMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };            
 
  const getTopratedMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setTopratedMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };


  const getUpcomingMovies = async () => {
   try {
      const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setUpcomingMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getTopratedMovies();
    getUpcomingMovies();
  }, []);

  return (
    <div className="bg-black">
      <div>
      <h1 className="text-3xl pt-8 pl-9 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans  font-bold">Popular </h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {popularMovies.map((movie) => (
         <Moviepagecard key={movie.id} movie={movie} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
          </div>
          </div>

      <div>
        <h1 className="text-3xl pt-8  pl-9 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans  font-bold">Top Rated </h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {topratedMovies.map((movie) => (
         <Moviepagecard key={movie.id} movie={movie} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl pt-8  pl-9 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans  font-bold">Upcoming </h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {upcomingMovies.map((movie) => (
         <Moviepagecard key={movie.id} movie={movie} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
