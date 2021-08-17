import {getMovieById} from '../utils/common';
import {moviesData} from '../mock-data/movies-data';

export const updateUserDetails = (movieId, option) => {
  const movieData = getMovieById(moviesData, movieId);
  movieData.userDetails[option] = !movieData.userDetails[option];
};
