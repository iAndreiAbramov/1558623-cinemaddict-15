import {getAllMovies} from './data-filters';
import FilmCard from '../view/film-card';
import {renderDOMElement, Positions} from '../utils/render';

const data = getAllMovies();
const CARDS_COUNT_STEP = 5;
let shownCardsNumber = 0;

export const showMoreCards = () => {
  const filmsContainer = document.querySelectorAll('.films-list__container')[0];
  const showMoreButton = document.querySelector('.films-list__show-more');

  let cardsToShow = Math.max(shownCardsNumber + CARDS_COUNT_STEP, CARDS_COUNT_STEP);
  cardsToShow = Math.min(cardsToShow, data.length);

  while (shownCardsNumber < cardsToShow) {
    const filmCard = new FilmCard(data[shownCardsNumber]);
    renderDOMElement(filmsContainer, filmCard, Positions.BEFOREEND);
    shownCardsNumber++;
  }
  if (shownCardsNumber === data.length) {
    showMoreButton.remove();
  }
};
