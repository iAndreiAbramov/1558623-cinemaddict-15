export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const getShortDescription = (description, maxLength) => {
  if (description && description.length > maxLength) {
    description = `${description.substr(0, maxLength)}...`;
  }
  return description || '';
};

export const getGenresList = (arrayOfMovies) => {
  if (arrayOfMovies.length === 0) {
    return {};
  }
  const genresList = {};
  arrayOfMovies.forEach((movie) => {
    const movieGenres = movie.filmInfo.genre.filter((item) => item !== ' ');
    movieGenres.forEach((genre) => {
      if (genre) {
        if (genre in genresList) {
          genresList[genre]++;
        } else {
          genresList[genre] = 1;
        }
      }
    });
  });
  return genresList;
};

export const getTopGenre = (arrayOfMovies) => {
  if (arrayOfMovies.length === 0) {
    return null;
  }
  const genresList = getGenresList(arrayOfMovies);
  return Object.entries(genresList).sort((a, b) => b[1] - a[1])[0][0];
};

export const getMovieById = (arrayOfMovies, identifier) => arrayOfMovies.find((item) => +item.id === +identifier);

export const getCommentIndexById = (comments, identifier) => comments.findIndex((item) => +item.id === +identifier);

export const isOnline = () => window.navigator.onLine;

export const getRandomInteger = (min, max) => {
  let startValue = Math.ceil(Math.min(min, max));
  let endValue = Math.floor(Math.max(min, max));
  startValue -= 0.5;
  endValue += 0.5;
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return Math.round(randomInteger);
};

export const getRandomFilms = (source, number) => {
  const randomFilms = [];
  const usedIndexes = [];
  while (randomFilms.length < number) {
    const index = getRandomInteger(0, source.length);
    if (!usedIndexes.includes(index)) {
      randomFilms.push(source[index]);
      usedIndexes.push(index);
    }
  }
  return [...randomFilms];
};
