import dayjs from 'dayjs';
import {getRandomInteger} from './common';

// eslint-disable-next-line no-undef
const relativeTime = require('dayjs/plugin/relativeTime');
// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(relativeTime);
dayjs.extend(duration);

const DATE_INTERVAL_IN_DAYS = 365;

// Возвращает случайную дату в интервале 365 дней назад с текущей даты по текущую дату в указанном формате.
export const getRandomDate = () => {
  const day = dayjs().date((getRandomInteger(-DATE_INTERVAL_IN_DAYS, dayjs().date())));
  return dayjs(day);
};

export const formatDate = (date, format) => dayjs(date).format(format);

export const formatDateForComments = (date) => dayjs(date).fromNow();

export const getDurationFromMinutes = (durationInMinutes) => {
  const lasting = dayjs.duration(durationInMinutes, 'minutes');
  return `${lasting.hours()}h ${lasting.minutes()}m`;
};

export const getTotalDuration = (arrayOfMovies) => arrayOfMovies.reduce((acc, cur) => acc += cur.filmInfo.runtime, 0);
