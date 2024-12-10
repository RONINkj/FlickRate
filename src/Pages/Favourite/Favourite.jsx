import React, { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../Utility/firebase';
import { updateDoc, doc, getDoc, arrayRemove } from 'firebase/firestore';
function Favorite() {
  const { user } = UserAuth();

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTVShows, setFavoriteTVShows] = useState([]);

  // Retrieve favorites from Firestore on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, 'users',  `${user?.email}`);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const movies = userData.savedShows.filter(item => item.type === 'movie');
          const tvShows = userData.savedShows.filter(item => item.type === 'tvShow');
          setFavoriteMovies(movies);
          setFavoriteTVShows(tvShows);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user]);

  // Function to handle removing a favorite item
  const removeFavorite = async (id) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', `${user?.email}`);
      await updateDoc(userDocRef, {
         savedShows: arrayRemove({ id })
      });

      // Refresh favorite lists after removing an item
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const movies = userData.savedShows.filter(item => item.type === 'movie');
        const tvShows = userData.savedShows.filter(item => item.type === 'tvShow');
        setFavoriteMovies(movies);
        setFavoriteTVShows(tvShows);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="bg-[#213547] text-white">
      <h1 className="text-2xl  mb-2"> Favourite Movies</h1>
      <div className="grid grid-cols-3 gap-2 ">
        {favoriteMovies.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            <div className="w-full" style={{ width: '200px' }}> {/* Set a fixed width container */}
            <img 
              src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} 
              alt={favorite.original_title} 
              className="w-full mx-2 h-60 rounded-lg object-cover shadow-lg mb-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer hover:border-[3px] border-gray-400"
            />
            </div>
            <p >{favorite.original_title}</p>
            <button onClick={() => removeFavorite(favorite.id)} className=" mx-auto mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
          </div>
        ))}
      </div>

      <h1 className="text-2xl mt-8 mb-2"> Favorite TV Shows</h1>
      <div className="grid grid-cols-3 gap-4">
        {favoriteTVShows.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            <div className="w-full" style={{ width: '200px' }}> {/* Set a fixed width container */}
            <img 
              src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} 
              alt={favorite.name} 
              className="w-full h-60 rounded-lg object-cover shadow-lg mb-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer hover:border-[3px] border-gray-400"
            />
            </div>
            <p >{favorite.name}</p>
            <button onClick={() => removeFavorite(favorite.id)} className=" mx-auto mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
