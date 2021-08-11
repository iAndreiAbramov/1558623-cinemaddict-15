import FilmCard from '../view/film-card';
import {renderDOMElement, Positions} from '../utils/render';

const NUMBER_OF_EXTRA_CARDS = 2;

export const renderExtraData = (container, data) => {
  const numberToShow = Math.min(data.length, NUMBER_OF_EXTRA_CARDS);
  for (let i = 0; i < numberToShow; i++) {
    const filmCard = new FilmCard(data[i]);
    renderDOMElement(container, filmCard, Positions.BEFOREEND);
  }
};
