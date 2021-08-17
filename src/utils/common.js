export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

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

export const getRandomSubArray = (arrayOfItems) => arrayOfItems.filter(() => getRandomBoolean());

export const getRandomDescription = (arrayOfStrings) => arrayOfStrings.slice(0, getRandomInteger(1, 5)).join(' ');

export const getShortDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    description = `${description.substr(0, maxLength)}...`;
  }
  return description;
};

export const getMovieById = (arrayOfMovies, identifier) => arrayOfMovies.find((item) => +item.id === +identifier);

export const getMovieIndexById = (arrayOfMovies, identifier) => arrayOfMovies.findIndex((item) => +item.id === +identifier);

export const getMovieId = (() => {
  let id = 0;
  return () => ++id;
})();
