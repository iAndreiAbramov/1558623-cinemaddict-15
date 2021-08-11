import dayjs from 'dayjs';
import {getRandomInteger} from './common';

const DATE_INTERVAL_IN_DAYS = 365;
const MINUTES_IN_HOUR = 60;

// Возвращает случайную дату в интервале 365 дней назад с текущей даты по текущую дату в указанном формате.
export const getRandomDate = () => {
  const day = dayjs().date((getRandomInteger(-DATE_INTERVAL_IN_DAYS, dayjs().date())));
  return dayjs(day);
};

export const reformatDate = (date, format) => dayjs(date).format(format);

//todo: Реализовать показ относительного времени (плагин RelativeTime)
export const reformatDateForComments = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

//Возвращает случайную длительность от 60 до 240 минут. Преобразует в формат 3h 24m
export const transformDuration = (durationInMinutes) => {
  const minutes = durationInMinutes % MINUTES_IN_HOUR;
  const hours = (durationInMinutes - minutes) / MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};
