import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const DEFAULT_TIME_UNITS_NUMBER = 1;

export const formatDate = (date, format) => dayjs(date).format(format);

export const formatDateForComments = (date) => dayjs(date).fromNow();

export const getDurationFromMinutes = (durationInMinutes) => {
  const lasting = dayjs.duration(durationInMinutes, 'minutes');
  return `${lasting.hours()}h ${lasting.minutes()}m`;
};

export const getTotalDuration = (arrayOfMovies) => arrayOfMovies.reduce((acc, cur) => {
  acc += cur.filmInfo.runtime;
  return acc;
}, 0);

export const filterMoviesByPeriod = (arrayOfMovies, period) => {
  const deadline = dayjs().subtract(DEFAULT_TIME_UNITS_NUMBER, period);
  return arrayOfMovies.filter((movie) => dayjs(movie.userDetails.watchingDate).diff(deadline, 'minute') > 0);
};
