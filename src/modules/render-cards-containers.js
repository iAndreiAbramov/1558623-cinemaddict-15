import ListsContainer from '../view/lists-container';
import CardsContainer from '../view/cards-container';
import ExtraContainer from '../view/extra-container';
import MoreButton from '../view/more-button';
import {renderDOMElement, Positions} from '../utils/render';
import {showMoreCards} from './show-more-cards';
import {showPopup} from './show-popup';

export const renderCardsContainers = () => {
  const mainContainer = document.querySelector('.main');
  const listsContainerHtml = new ListsContainer();
  const listContainer = new CardsContainer();
  listContainer.setClickCallback(showPopup);
  const topRatedContainer = new ExtraContainer('Top rated');
  const mostCommentedContainer = new ExtraContainer('Most commented');

  renderDOMElement(mainContainer, listsContainerHtml, Positions.BEFOREEND);
  const filmListsContainer = document.querySelector('.films');

  renderDOMElement(filmListsContainer, listContainer, Positions.AFTERBEGIN);
  renderDOMElement(filmListsContainer, topRatedContainer, Positions.BEFOREEND);
  renderDOMElement(filmListsContainer, mostCommentedContainer, Positions.BEFOREEND);

  const showMoreContainer = document.querySelector('.films-list');
  const showMoreButton = new MoreButton();
  showMoreButton.setClickHandler(showMoreCards);

  renderDOMElement(showMoreContainer, showMoreButton, Positions.BEFOREEND);
};
