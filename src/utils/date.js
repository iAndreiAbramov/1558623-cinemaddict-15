import dayjs from 'dayjs';
import {getRandomInteger} from './common';

// eslint-disable-next-line no-undef
const relativeTime = require('dayjs/plugin/relativeTime');
// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(relativeTime);
dayjs.extend(duration);

const DATE_INTERVAL_IN_DAYS = 364;
const DEFAULT_TIME_UNITS_NUMBER = 1;

// Возвращает случайную дату в интервале 365 дней назад с текущей даты по текущую дату в указанном формате.
export const getRandomDate = () => dayjs().subtract(getRandomInteger(DEFAULT_TIME_UNITS_NUMBER, DATE_INTERVAL_IN_DAYS), 'day');

export const formatDate = (date, format) => dayjs(date).format(format);

export const formatDateForComments = (date) => dayjs(date).fromNow();

export const getDurationFromMinutes = (durationInMinutes) => {
  const lasting = dayjs.duration(durationInMinutes, 'minutes');
  return `${lasting.hours()}h ${lasting.minutes()}m`;
};

export const getTotalDuration = (arrayOfMovies) => arrayOfMovies.reduce((acc, cur) => acc += cur.filmInfo.runtime, 0);

export const filterMoviesByPeriod = (arrayOfMovies, period) => {
  const deadline = dayjs().subtract(DEFAULT_TIME_UNITS_NUMBER, period);
  return arrayOfMovies.filter((movie) => dayjs(movie.userDetails.watchingDate).diff(deadline, 'minute') > 0);
};
