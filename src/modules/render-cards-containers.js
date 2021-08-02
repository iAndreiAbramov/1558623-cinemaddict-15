import {getListsContainerHtml} from '../view/lists-container';
import {getCardsContainerHtml} from '../view/cards-container';
import {getExtraContainerHtml} from '../view/extra-container';
import {insertHtmlElement} from '../services/utils';
import {getMoreHtml} from '../view/more-button';

export const renderCardsContainers = () => {
  const mainContainer = document.querySelector('.main');
  const listsContainerHtml = getListsContainerHtml();
  const filmsListHtml = getCardsContainerHtml('All movies. Upcoming');
  const topRatedListHtml = getExtraContainerHtml('Top rated');
  const mostCommentedListHtml = getExtraContainerHtml('Most commented');

  insertHtmlElement(mainContainer, listsContainerHtml, 'beforeend');
  const filmListsContainer = document.querySelector('.films');

  insertHtmlElement(filmListsContainer, filmsListHtml, 'afterbegin');
  insertHtmlElement(filmListsContainer, topRatedListHtml, 'beforeend');
  insertHtmlElement(filmListsContainer, mostCommentedListHtml, 'beforeend');

  const showMoreContainer = document.querySelector('.films-list');
  const showMoreButton = getMoreHtml();

  insertHtmlElement(showMoreContainer, showMoreButton, 'beforeend');

};
