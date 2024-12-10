import React, { useEffect, useState } from 'react';
import Tvpagecard from '../../Components/Tvpagecard';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../Utility/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

function TVSHOWS() {

  const { user, logIn } = UserAuth(); // Destructure user and logIn from UserAuth

  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topratedTVShows, setTopratedTVShows] = useState([]);
  const [airingtodayTVShows, setAiringTodayTVShows] = useState([]);

   const handleAddToFavourite = async (id, name, poster_path) => {
  if (user) {
   try {
      // Add favorite movie to Firestore database
    const favoriteItem = { id, name, poster_path, type: 'tvShow' };
     const userDocRef = doc(db, 'users', `${user?.email}`);
      await updateDoc(userDocRef, {
        savedShows: arrayUnion(favoriteItem),
         id: id,
        name: name,
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


  const getPopularTVShows = async () =>{
    try {
      const response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setPopularTVShows(data.results);
    } catch(err) {
      console.error(err);
    }
  }

  const getTopratedTVShows = async () =>{
    try {
      const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setTopratedTVShows(data.results);
    } catch(err) {
      console.error(err);
    }
  }

  const getAiringTodayTVShows = async () =>{
    try {
      const response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      console.log(data.results);
      setAiringTodayTVShows(data.results);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPopularTVShows();
    getTopratedTVShows();
    getAiringTodayTVShows();
  }, []);

  return (
    <div className="bg-black">
      <div>
      <h1 className="text-3xl pt-8 pl-9 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans font-bold">Popular </h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4 ">
          {popularTVShows.map((tv) => (
         <Tvpagecard key={tv.id} tv={tv} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
          </div>
          </div>
     

       <div>
            <h1 className="text-3xl pt-8  pl-9 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans  font-bold">Top Rated </h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {topratedTVShows.map((tv) => (
         <Tvpagecard key={tv.id} tv={tv} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
          </div>
        </div>

         <div>  
          <h1 className="text-3xl pt-8  pl-9 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans  font-bold"> Airing Today</h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {airingtodayTVShows.map((tv) => (
         <Tvpagecard key={tv.id} tv={tv} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TVSHOWS;
