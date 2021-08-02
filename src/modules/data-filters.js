export const getWatchListMovies = (filmsData) => {
  const result = [];
  filmsData.forEach((film) => {
    const {userDetails} = film;
    if (userDetails.watchlist) {
      result.push(film);
    }
  });
  return result;
};

export const getWatchedMovies = (filmsData) => {
  const result = [];
  filmsData.forEach((film) => {
    const {userDetails} = film;
    if (userDetails.alreadyWatched) {
      result.push(film);
    }
  });
  return result;
};

export const getFavoriteMovies = (filmsData) => {
  const result = [];
  filmsData.forEach((film) => {
    const {userDetails} = film;
    if (userDetails.favorite) {
      result.push(film);
    }
  });
  return result;
};
