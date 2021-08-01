import {getFilmCardHtml} from '../view/film-card';
import {insertHtmlElement} from '../services/utils';
import {moviesData} from '../mock-data/movies-data';

const data = moviesData;
const DEFAULT_CARDS_NUMBER = 5;
let shownCardsNumber = 0;

export const renderFilmsList = () => {
  const filmsContainer = document.querySelectorAll('.films-list__container')[0];
  const showMoreButton = document.querySelector('.films-list__show-more');
  let cardsToShow = Math.max(shownCardsNumber + DEFAULT_CARDS_NUMBER, DEFAULT_CARDS_NUMBER);
  cardsToShow = Math.min(cardsToShow, data.length);
  while (shownCardsNumber < cardsToShow) {
    const filmCard = getFilmCardHtml(data[shownCardsNumber]);
    insertHtmlElement(filmsContainer, filmCard, 'beforeend');
    shownCardsNumber++;
  }
  if (shownCardsNumber === data.length) {
    showMoreButton.remove();
  }
};
