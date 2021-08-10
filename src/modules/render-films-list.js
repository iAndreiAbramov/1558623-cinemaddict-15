import FilmCard from '../view/film-card';
import MessageForEmpty from '../view/cards-container-empty';
import {renderDOMElement, Positions} from '../utils/render';

const DEFAULT_CARDS_NUMBER = 5;

const getMessageForEmpty = (option) => {
  const messagesForEmpty = {
    '#all': 'There are no movies in our database',
    '#watchlist': 'There are no movies to watch now',
    '#history': 'There are no watched movies now',
    '#favorites': 'There are no favorite movies now',
  };
  return messagesForEmpty[option];
};

const getMessageOption = () => {
  const activeFilterElement = document.querySelector('.main-navigation__item--active');
  return activeFilterElement.getAttribute('href');
};

export const renderFilmsList = (data) => {
  const filmsContainer = document.querySelectorAll('.films-list__container')[0];
  if (data.length === 0) {
    const message = getMessageForEmpty(getMessageOption());
    const messageElement = new MessageForEmpty(message);
    renderDOMElement(filmsContainer, messageElement, Positions.AFTERBEGIN);
  } else {
    for (let i = 0; i < DEFAULT_CARDS_NUMBER; i++) {
      const filmCard = new FilmCard(data[i]);
      renderDOMElement(filmsContainer, filmCard, Positions.BEFOREEND);
    }
  }
};
