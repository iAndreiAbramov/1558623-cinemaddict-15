import {getCardsContainerHtml} from './view/cards-container';
import {getListsContainerHtml} from './view/lists-container';
import {getExtraContainerHtml} from './view/extra-container';
import {getUserRankHtml} from './view/user-rank';
import {getNumberOfFilmsHtml} from './view/number-of-films';
import {getFiltersMenuHtml} from './view/filters-menu';
import {getSortPanelHtml} from './view/sort-panel';
import {getMoreHtml} from './view/more-button';
import {moviesData} from './mock-data/movies-data';
import {insertHtmlElement} from './services/utils';
import {setOpenPopupHandler} from './modules/show-popup-handler';
import {setMoreButtonHandler} from './modules/more-button-handler';
import {renderFilmsList} from './modules/render-films-list';
import {renderExtraData} from './modules/render-extra-data';
import {sortByCommentsNumber, sortByRating} from './modules/data-sort';

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

const topRatedContainer = document.querySelectorAll('.films-list__container')[1];
const mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];

const showMoreContainer = document.querySelector('.films-list');
const showMoreButton = getMoreHtml();

insertHtmlElement(showMoreContainer, showMoreButton, 'beforeend');
renderFilmsList(moviesData);

renderExtraData(topRatedContainer, sortByRating(moviesData));
renderExtraData(mostCommentedContainer, sortByCommentsNumber(moviesData));

setOpenPopupHandler('.films-list__container');
setMoreButtonHandler();

// eslint-disable-next-line no-console
//console.log(moviesData[0]);
