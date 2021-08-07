import {moviesData} from '../mock-data/movies-data';

export const getAllMovies = () => [...moviesData];

export const getWatchListMovies = () => {
  const result = [];
  moviesData.forEach((film) => {
    const {userDetails} = film;
    if (userDetails.watchlist) {
      result.push(film);
    }
  });
  return result;
};

export const getWatchedMovies = () => {
  const result = [];
  moviesData.forEach((film) => {
    const {userDetails} = film;
    if (userDetails.alreadyWatched) {
      result.push(film);
    }
  });
  return result;
};

export const getFavoriteMovies = () => {
  const result = [];
  moviesData.forEach((film) => {
    const {userDetails} = film;
    if (userDetails.favorite) {
      result.push(film);
    }
  });
  return result;
};
