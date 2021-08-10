import dayjs from 'dayjs';
import {getRandomInteger} from './common';

// Возвращает случайную дату в интервале 365 дней назад с текущей даты по текущую дату в указанном формате.
export const getRandomDate = () => {
  const day = dayjs().date((getRandomInteger(-365, dayjs().date())));
  return dayjs(day);
};

export const reformatDate = (date, format) => dayjs(date).format(format);

//todo: Реализовать показ относительного времени (плагин RelativeTime)
export const reformatDateForComments = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

//Возвращает случайную длительность от 60 до 240 минут. Преобразует в формат 3h 24m
export const transformDuration = (durationInMinutes) => {
  const minutes = durationInMinutes % 60;
  const hours = (durationInMinutes - minutes) / 60;
  return `${hours}h ${minutes}m`;
};
