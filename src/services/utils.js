import dayjs from 'dayjs';

export const getRandomInteger = (min, max) => {
  let startValue = Math.ceil(Math.min(min, max));
  let endValue = Math.floor(Math.max(min, max));
  startValue -= 0.5;
  endValue += 0.5;
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return Math.round(randomInteger);
};

export const getRandomFloat = (min, max, decimals) => {
  const startValue = Math.min(min, max);
  const endValue = Math.max(min, max);
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return +randomInteger.toFixed(decimals);
};

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export const getRandomItem = (arrayOfItems) => {
  const index = getRandomInteger(0, arrayOfItems.length - 1);
  return arrayOfItems[index];
};

export const getRandomSubArray = (arrayOfItems) => arrayOfItems.filter(() => getRandomInteger(0, 1));

export const getRandomDescription = (arrayOfStrings, maxLength) => {
  let description = getRandomSubArray(arrayOfStrings).join(' ');
  if (description.length > maxLength) {
    description = `${description.substr(0, 139)}...`;
  }
  return description;
};

// Возвращает случайную дату в интервале 365 дней назад с текущей даты по текущую дату в указанном формате.
export const getRandomDate = (format) => {
  const day = dayjs().date(getRandomInteger(-365, dayjs().date()));
  return dayjs(day).format(format);
};

//Возвращает случайную длительность от 60 до 240 минут. Преобразует в формат 3h 24m
export const transformDuration = (durationInMinutes) => {
  const minutes = durationInMinutes % 60;
  const hours = (durationInMinutes - minutes) / 60;
  return `${hours}h ${minutes}m`;
};

export const insertHtmlElement = (parent, htmlElement, position) => {
  if (parent) {
    parent.insertAdjacentHTML(position, htmlElement);
  }
};

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
