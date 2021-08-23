import dayjs from 'dayjs';
import {getRandomInteger} from './common';

const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');
dayjs.extend(relativeTime);
dayjs.extend(duration);

const DATE_INTERVAL_IN_DAYS = 365;

// Возвращает случайную дату в интервале 365 дней назад с текущей даты по текущую дату в указанном формате.
export const getRandomDate = () => {
  const day = dayjs().date((getRandomInteger(-DATE_INTERVAL_IN_DAYS, dayjs().date())));
  return dayjs(day);
};

export const reformatDate = (date, format) => dayjs(date).format(format);

export const reformatDateForComments = (date) => dayjs(date).fromNow();

export const getDurationFromMinutes = (durationInMinutes) => {
  const lasting = dayjs.duration(durationInMinutes, 'minutes');
  return `${lasting.hours()}h ${lasting.minutes()}m`;
};
