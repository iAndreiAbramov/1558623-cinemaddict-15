import CardsContainer from '../view/cards-container';
import MessageForEmptyList from '../view/message-for-empty-list';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, renderDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortPanel from '../view/sort-panel';
import FilmCard from '../view/film-card';
import {sortByCommentsNumber, sortByRating} from '../modules/data-sort';
import {getAllMovies} from '../modules/data-filters';
import {getMovieById, isEscEvent} from '../utils/common';
import FilmPopup from '../view/film-popup';
import CommentItem from '../view/popup-comment';
import MoreButton from '../view/more-button';
import {moviesData} from '../mock-data/movies-data';

const DEFAULT_CARDS_NUMBER = 5;
const CARDS_COUNT_STEP = 5;
const UserDetailsOptions = {
  'add-to-watchlist': 'watchlist',
  'mark-as-watched': 'alreadyWatched',
  'favorite': 'favorite',
};

export default class FilmsListPresenter {
  constructor() {
    this._listsContainer = new ListsContainer();
    this._cardsContainer = new CardsContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._allMovies = getAllMovies();
    this._mainContainer = document.querySelector('.main');
    this._defaultCardsNumber = DEFAULT_CARDS_NUMBER;
    this._cardsCountStep = CARDS_COUNT_STEP;
    this._handleMoreButtonClick = this._handleMoreButtonClick.bind(this);
    this._handleContainerClick = this._handleContainerClick.bind(this);
  }

  init() {
    this._renderFilmsNumber(this._allMovies);
    this._renderUserRank(this._allMovies);
    this._renderFiltersMenu(this._allMovies);
    this._renderSortPanel();
    this._renderCardsContainers();
    this._renderFilmsList(this._allMovies);
    this._renderTopRated(this._allMovies);
    this._renderMostCommented(this._allMovies);
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

  _handleMoreButtonClick() {
    const filmsContainer = document.querySelectorAll('.films-list__container')[0];
    const showMoreButton = document.querySelector('.films-list__show-more');

    let shownCardsNumber = filmsContainer.children.length;

    const cardsToShow = Math.min(shownCardsNumber + this._cardsCountStep, this._allMovies.length);

    while (shownCardsNumber < cardsToShow) {
      const filmCard = new FilmCard(this._allMovies[shownCardsNumber]);
      renderDOMElement(filmsContainer, filmCard, Positions.BEFOREEND);
      shownCardsNumber++;
    }
    if (shownCardsNumber === this._allMovies.length) {
      showMoreButton.remove();
    }
  }

  _handleContainerClick() {
    const cardsContainers = document.querySelectorAll('.films-list__container');
    const popupContainer = document.querySelector('.footer');

    cardsContainers.forEach((cardsContainer) => {
      cardsContainer.addEventListener('click', (clickEvt) => {
        clickEvt.preventDefault();
        clickEvt.stopImmediatePropagation();
        const activePopup = document.querySelector('.film-details');
        if (activePopup) {
          activePopup.remove();
        }

        const targetId = clickEvt.target.closest('article').getAttribute('data-id');
        const movieItem = getMovieById(this._allMovies, targetId);
        const {comments} = movieItem;
        const filmPopup = new FilmPopup(movieItem);

        if (
          clickEvt.target.classList.contains('film-card__poster') ||
          clickEvt.target.classList.contains('film-card__title') ||
          clickEvt.target.classList.contains('film-card__comments')
        ) {
          renderDOMElement(popupContainer, filmPopup, Positions.AFTEREND);
          document.body.style.overflow = 'hidden';
          const popup = document.querySelector('.film-details');
          const closeButton = popup.querySelector('.film-details__close-btn');
          const commentsContainer = popup.querySelector('.film-details__comments-list');

          const closePopupByEsc = (keyDownEvt) => {
            if (isEscEvent(keyDownEvt)) {
              popup.remove();
              document.removeEventListener('keydown', closePopupByEsc);
              document.body.style.overflow = '';
            }
          };

          const closePopupByClick = () => {
            popup.remove();
            document.removeEventListener('keydown', closePopupByEsc);
            document.body.style.overflow = '';
          };

          document.addEventListener('keydown', closePopupByEsc);
          closeButton.addEventListener('click', closePopupByClick);

          comments.forEach((commentItem) => {
            const comment = new CommentItem(commentItem).getElement();
            renderDOMElement(commentsContainer, comment, Positions.BEFOREEND);
          });
        }

        if (clickEvt.target.classList.contains('film-card__controls-item')) {
          const card = clickEvt.target.closest('article');
          const id = card.getAttribute('data-id');
          const option = (
            [...clickEvt.target.classList]
              .join('')
              .replace(/(film-card__controls-item)|(active)|(--)/gi, '')
          );
          this._updateUserDetails(id, UserDetailsOptions[option]);
        }
      });
    });
  }

  _renderCardsContainers() {
    this._cardsContainer.setClickCallback(this._handleContainerClick);

    renderDOMElement(this._mainContainer, this._listsContainer, Positions.BEFOREEND);

    const filmListsContainer = document.querySelector('.films');

    renderDOMElement(filmListsContainer, this._cardsContainer, Positions.AFTERBEGIN);
    renderDOMElement(filmListsContainer, this._topRatedContainer, Positions.BEFOREEND);
    renderDOMElement(filmListsContainer, this._mostCommentedContainer, Positions.BEFOREEND);

    const showMoreContainer = document.querySelector('.films-list');
    const showMoreButton = new MoreButton();
    showMoreButton.setClickHandler(this._handleMoreButtonClick);

    renderDOMElement(showMoreContainer, showMoreButton, Positions.BEFOREEND);
  }

  _updateUserDetails(movieId, option) {
    const movieData = getMovieById(moviesData, movieId);
    console.log(movieData.userDetails[option]);
    movieData.userDetails[option] = !movieData.userDetails[option];
    console.log(getMovieById(moviesData, movieId));
  }

  _renderFilmsList(data) {
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
      for (let i = 0; i < this._defaultCardsNumber; i++) {
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
