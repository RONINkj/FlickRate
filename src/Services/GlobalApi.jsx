import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "fdeff6c8dc7c398d53999b4c61dee22d";
const movieByGenreBaseURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=fdeff6c8dc7c398d53999b4c61dee22d";
//https://api.themoviedb.org/3/trending/all/day?api_key=fdeff6c8dc7c398d53999b4c61dee22d
const getTrendingVideos = axios.get(
  movieBaseUrl + "/trending/all/day?api_key" + api_key
);
const getMovieByGenreId = (id) =>
  axios.get(movieByGenreBaseURL + "&with_genres=" + id);

export default {
  getTrendingVideos,
  getMovieByGenreId,
};