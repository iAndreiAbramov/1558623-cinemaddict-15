import CardsContainer from '../view/cards-container';
import MessageForEmptyList from '../view/message-for-empty-list';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, renderDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortPanel from '../view/sort-panel';
import {showPopup} from '../modules/show-popup';
import MoreButton from '../view/more-button';
import {showMoreCards} from '../modules/show-more-cards';
import FilmCard from '../view/film-card';
import {sortByCommentsNumber, sortByRating} from '../modules/data-sort';
import {getAllMovies} from '../modules/data-filters';

export default class FilmsListPresenter {
  constructor() {
    this._listsContainer = new ListsContainer();
    this._cardsContainer = new CardsContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._initialData = getAllMovies();
    this._mainContainer = document.querySelector('.main');
  }

  init() {
    this._renderFilmsNumber(this._initialData);
    this._renderUserRank(this._initialData);
    this._renderFiltersMenu(this._initialData);
    this._renderSortPanel();
    this._renderCardsContainers();
    this._renderFilmsList(this._initialData);
    this._renderTopRated(this._initialData);
    this._renderMostCommented(this._initialData);
  }

  _renderFilmsNumber(data) {
    const numberOfFilmsContainer = document.querySelector('.footer__statistics');
    const numberOfFilms = new NumberOfFilms(data);
    renderDOMElement(numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
  }

  _renderUserRank(data) {
    const userRankContainer = document.querySelector('.header');
    const userRank = new UserRankView(data);
    renderDOMElement(userRankContainer, userRank, Positions.BEFOREEND);
  }

  _renderFiltersMenu(data) {
    const filtersMenu = new FiltersMenu(data);
    renderDOMElement(this._mainContainer, filtersMenu, Positions.AFTERBEGIN);
  }

  _renderSortPanel() {
    const sortPanel = new SortPanel();
    renderDOMElement(this._mainContainer, sortPanel, Positions.BEFOREEND);
  }

  _renderCardsContainers() {
    this._cardsContainer.setClickCallback(showPopup);

    renderDOMElement(this._mainContainer, this._listsContainer, Positions.BEFOREEND);

    const filmListsContainer = document.querySelector('.films');

    renderDOMElement(filmListsContainer, this._cardsContainer, Positions.AFTERBEGIN);
    renderDOMElement(filmListsContainer, this._topRatedContainer, Positions.BEFOREEND);
    renderDOMElement(filmListsContainer, this._mostCommentedContainer, Positions.BEFOREEND);

    const showMoreContainer = document.querySelector('.films-list');
    const showMoreButton = new MoreButton();
    showMoreButton.setClickHandler(showMoreCards);

    renderDOMElement(showMoreContainer, showMoreButton, Positions.BEFOREEND);
  }

  _renderFilmsList(data) {
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

    const filmsContainer = document.querySelectorAll('.films-list__container')[0];
    if (data.length === 0) {
      const message = getMessageForEmpty(getMessageOption());
      const messageElement = new MessageForEmptyList(message);
      renderDOMElement(filmsContainer, messageElement, Positions.AFTERBEGIN);
    } else {
      for (let i = 0; i < DEFAULT_CARDS_NUMBER; i++) {
        const filmCard = new FilmCard(data[i]);
        renderDOMElement(filmsContainer, filmCard, Positions.BEFOREEND);
      }
    }
  }

  _renderExtraData(container, data) {
    const NUMBER_OF_EXTRA_CARDS = 2;
    const numberToShow = Math.min(data.length, NUMBER_OF_EXTRA_CARDS);
    for (let i = 0; i < numberToShow; i++) {
      const filmCard = new FilmCard(data[i]);
      renderDOMElement(container, filmCard, Positions.BEFOREEND);
    }
  }

  _renderTopRated(data) {
    const topRatedContainer = document.querySelectorAll('.films-list__container')[1];
    this._renderExtraData(topRatedContainer, sortByRating(data));
  }

  _renderMostCommented(data) {
    const mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];
    this._renderExtraData(mostCommentedContainer, sortByCommentsNumber(data));
  }
}
