import {getCardsContainerHtml} from './view/cards-container';
import {getListsContainerHtml} from './view/lists-container';
import {getExtraContainerHtml} from './view/extra-container';
import {getUserRankHtml} from './view/user-rank';
import {getNumberOfFilmsHtml} from './view/number-of-films';
import {getFiltersMenuHtml} from './view/filters-menu';
import {getSortPanelHtml} from './view/sort-panel';
import {getFilmCardHtml} from './view/film-card';
import {getMoreHtml} from './view/more-button';
import {getFilmPopupHtml} from './view/film-popup';

const NUMBER_OF_REPEATS = 1;
const NUMBER_OF_LIST_CARDS = 5;
const NUMBER_OF_EXTRA_CARDS = 2;

const insertHtmlElement = (parent, htmlElement, position, repeats = NUMBER_OF_REPEATS) => {
  if (parent) {
    for (let i = 0; i < repeats; i++) {
      parent.insertAdjacentHTML(position, htmlElement);
    }
  }
};

const userRankContainer = document.querySelector('.header');
const userRank = getUserRankHtml();

insertHtmlElement(userRankContainer, userRank, 'beforeend');

const numberOfFilmsContainer = document.querySelector('.footer__statistics');
const numberOfFilms = getNumberOfFilmsHtml();

insertHtmlElement(numberOfFilmsContainer, numberOfFilms, 'beforeend');

const mainContainer = document.querySelector('.main');
const filtersMenu = getFiltersMenuHtml();
const sortPanel = getSortPanelHtml();

insertHtmlElement(mainContainer, filtersMenu, 'afterbegin');
insertHtmlElement(mainContainer, sortPanel, 'beforeend');

const listsContainerHtml = getListsContainerHtml();
const filmsListHtml = getCardsContainerHtml('All movies. Upcoming');
const topRatedListHtml = getExtraContainerHtml('Top rated');
const mostCommentedListHtml = getExtraContainerHtml('Most commented');

insertHtmlElement(mainContainer, listsContainerHtml, 'beforeend');
const filmListsContainer = document.querySelector('.films');

insertHtmlElement(filmListsContainer, filmsListHtml, 'afterbegin');
insertHtmlElement(filmListsContainer, topRatedListHtml, 'beforeend');
insertHtmlElement(filmListsContainer, mostCommentedListHtml, 'beforeend');

const filmsContainer = document.querySelectorAll('.films-list__container')[0];
const topRatedContainer = document.querySelectorAll('.films-list__container')[1];
const mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];
const filmCard = getFilmCardHtml();

insertHtmlElement(filmsContainer, filmCard, 'beforeend', NUMBER_OF_LIST_CARDS);
const showMoreContainer = document.querySelector('.films-list');
const showMoreButton = getMoreHtml();

insertHtmlElement(showMoreContainer, showMoreButton, 'beforeend');

insertHtmlElement(topRatedContainer, filmCard, 'beforeend', NUMBER_OF_EXTRA_CARDS);
insertHtmlElement(mostCommentedContainer, filmCard, 'beforeend', NUMBER_OF_EXTRA_CARDS);

const popupContainer = document.querySelector('.footer');
const filmPopup = getFilmPopupHtml();

insertHtmlElement(popupContainer, filmPopup, 'afterend');
