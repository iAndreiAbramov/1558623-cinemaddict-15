import ListsContainer from '../view/lists-container';
import CardsContainer from '../view/cards-container';
import ExtraContainer from '../view/extra-container';
import MoreButton from '../view/more-button';
import {renderDOMElement, Positions} from '../utils/render';

export const renderCardsContainers = () => {
  const mainContainer = document.querySelector('.main');
  const listsContainerHtml = new ListsContainer();
  const listContainer = new CardsContainer('All movies. Upcoming');
  const topRatedContainer = new ExtraContainer('Top rated');
  const mostCommentedContainer = new ExtraContainer('Most commented');

  renderDOMElement(mainContainer, listsContainerHtml, Positions.BEFOREEND);
  const filmListsContainer = document.querySelector('.films');

  renderDOMElement(filmListsContainer, listContainer, Positions.AFTERBEGIN);
  renderDOMElement(filmListsContainer, topRatedContainer, Positions.BEFOREEND);
  renderDOMElement(filmListsContainer, mostCommentedContainer, Positions.BEFOREEND);

  const showMoreContainer = document.querySelector('.films-list');
  const showMoreButton = new MoreButton();

  renderDOMElement(showMoreContainer, showMoreButton, Positions.BEFOREEND);
};
