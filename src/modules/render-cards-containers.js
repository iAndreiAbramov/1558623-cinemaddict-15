import ListsContainer from '../view/lists-container';
import CardsContainer from '../view/cards-container';
import ExtraContainer from '../view/extra-container';
import {insertDOMElement, Positions} from '../services/utils';
import MoreButton from '../view/more-button';

export const renderCardsContainers = () => {
  const mainContainer = document.querySelector('.main');
  const listsContainerHtml = new ListsContainer().getElement();
  const listContainer = new CardsContainer('All movies. Upcoming').getElement();
  const topRatedContainer = new ExtraContainer('Top rated').getElement();
  const mostCommentedContainer = new ExtraContainer('Most commented').getElement();

  insertDOMElement(mainContainer, listsContainerHtml, Positions.BEFOREEND);
  const filmListsContainer = document.querySelector('.films');

  insertDOMElement(filmListsContainer, listContainer, Positions.AFTERBEGIN);
  insertDOMElement(filmListsContainer, topRatedContainer, Positions.BEFOREEND);
  insertDOMElement(filmListsContainer, mostCommentedContainer, Positions.BEFOREEND);

  const showMoreContainer = document.querySelector('.films-list');
  const showMoreButton = new MoreButton().getElement();

  insertDOMElement(showMoreContainer, showMoreButton, Positions.BEFOREEND);
};
