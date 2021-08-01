import {getFilmCardHtml} from '../view/film-card';
import {insertHtmlElement} from '../services/utils';

const NUMBER_OF_EXTRA_CARDS = 2;

export const renderExtraData = (container, data) => {
  const numberToShow = Math.min(data.length, NUMBER_OF_EXTRA_CARDS);
  for (let i = 0; i < numberToShow; i++) {
    const filmCard = getFilmCardHtml(data[i]);
    insertHtmlElement(container, filmCard, 'beforeend');
  }
};
