import {getRandomCommentsData} from './comments-data';
import {getRandomDate} from '../utils/date';
import {
  Actors,
  Descriptions,
  FilmsDirectors,
  FilmsTitles,
  Genres,
  Posters,
  ReleaseCountries,
  Writers
} from './data-sets';
import {
  getMovieId,
  getRandomBoolean,
  getRandomDescription,
  getRandomFloat,
  getRandomInteger,
  getRandomItem,
  getRandomSubArray
} from '../utils/common';

const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 5;
const MIN_RATING = 0;
const MAX_RATING = 10;
const RATING_DECIMALS = 1;
const MIN_AGE_RATING = 0;
const MAX_AGE_RATING = 100;
const MIN_RUN_TIME = 60;
const MAX_RUN_TIME = 240;

const NUMBER_OF_MOVIES = 500;

const getRandomFilmData = (numberOfMovies) => {
  const movies = [];
  for (let i = 0; i < numberOfMovies; i++)  {
    movies.push({
      id: getMovieId(),
      comments: getRandomCommentsData(getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER)),
      filmInfo: {
        title: getRandomItem(FilmsTitles),
        alternativeTitle: getRandomItem(FilmsTitles),
        totalRating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_DECIMALS),
        poster: getRandomItem(Posters),
        ageRating: getRandomInteger(MIN_AGE_RATING, MAX_AGE_RATING),
        director: getRandomItem(FilmsDirectors),
        writers: getRandomSubArray(Writers).join(', '),
        actors: getRandomSubArray(Actors).join(', '),
        release: {
          date: getRandomDate(),
          releaseCountry: getRandomItem(ReleaseCountries),
        },
        runtime: getRandomInteger(MIN_RUN_TIME, MAX_RUN_TIME),
        genre: getRandomSubArray(Genres).join(' '),
        description: getRandomDescription(Descriptions),
      },
      userDetails: {
        watchlist: getRandomBoolean(),
        alreadyWatched: getRandomBoolean(),
        watchingDate: getRandomDate(),
        favorite: getRandomBoolean(),
      },
    });
  }
  return movies;
};

export const moviesData = getRandomFilmData(NUMBER_OF_MOVIES);
