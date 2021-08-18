import {getMovieById} from '../utils/common';
import {getAllMovies} from './data-filters';

export const updateUserDetails = (movieId, option) => {
  const movieData = getMovieById(getAllMovies(), movieId);
  movieData.userDetails[option] = !movieData.userDetails[option];
};
