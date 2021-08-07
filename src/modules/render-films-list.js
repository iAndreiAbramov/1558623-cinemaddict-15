import FilmCard from '../view/film-card';
import {insertDOMElement, Positions} from '../services/utils';

const DEFAULT_CARDS_NUMBER = 5;

export const renderFilmsList = (data) => {
  const filmsContainer = document.querySelectorAll('.films-list__container')[0];
  for (let i = 0; i < DEFAULT_CARDS_NUMBER; i++) {
    const filmCard = new FilmCard(data[i]).getElement();
    insertDOMElement(filmsContainer, filmCard, Positions.BEFOREEND);
  }
};
