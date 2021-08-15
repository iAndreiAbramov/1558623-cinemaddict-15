import CardsContainer from '../view/cards-container';
import MessageForEmptyList from '../view/message-for-empty-list';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, renderDOMElement, replaceDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortPanel from '../view/sort-panel';
import FilmCard from '../view/film-card';
import {sortByCommentsNumber, sortByRating} from '../modules/data-sort';
import {getAllMovies, getWatchedMovies} from '../modules/data-filters';
import {getMovieById, getMovieIndexById, isEscEvent} from '../utils/common';
import FilmPopup from '../view/film-popup';
import CommentItem from '../view/popup-comment';
import MoreButton from '../view/more-button';
import {moviesData} from '../mock-data/movies-data';
import PopupControls from '../view/popup-controls';

const DEFAULT_CARDS_NUMBER = 5;
const CARDS_COUNT_STEP = 5;
const NUMBER_OF_EXTRA_CARDS = 2;

export default class FilmsListPresenter {
  constructor() {
    this._listsContainer = new ListsContainer();
    this._cardsContainer = new CardsContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._mainContainer = document.querySelector('.main');
    this._defaultCardsNumber = DEFAULT_CARDS_NUMBER;
    this._cardsCountStep = CARDS_COUNT_STEP;
    this._handleMoreButtonClick = this._handleMoreButtonClick.bind(this);
    this._handleContainerClick = this._handleContainerClick.bind(this);
  }

  init() {
    this._renderFilmsNumber(getAllMovies());
    this._renderUserRank(getAllMovies());
    this._renderFiltersMenu(getAllMovies());
    this._renderSortPanel();
    this._renderCardsContainers();
    this._renderFilmsList(getAllMovies());
    this._renderTopRated(getAllMovies());
    this._renderMostCommented(getAllMovies());
  }

  // Рендер поля с количеством фильмов в базе
  _renderFilmsNumber(data) {
    const numberOfFilmsContainer = document.querySelector('.footer__statistics');
    const numberOfFilms = new NumberOfFilms(data);
    renderDOMElement(numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
  }

  // Рендер поля ранга пользователя
  _renderUserRank(data) {
    const userRankContainer = document.querySelector('.header');
    const oldUserRank = userRankContainer.querySelector('.header__profile');
    if (oldUserRank) {
      oldUserRank.remove();
    }
    const userRank = new UserRankView(data);
    renderDOMElement(userRankContainer, userRank, Positions.BEFOREEND);
  }

  // Рендер меню фильтров
  _renderFiltersMenu(data) {
    const oldMenu = this._mainContainer.querySelector('.main-navigation');
    if (oldMenu) {
      oldMenu.remove();
    }
    const filtersMenu = new FiltersMenu(data);
    renderDOMElement(this._mainContainer, filtersMenu, Positions.AFTERBEGIN);
  }

  // Отрисовка панели сортировки
  _renderSortPanel() {
    const sortPanel = new SortPanel();
    renderDOMElement(this._mainContainer, sortPanel, Positions.BEFOREEND);
  }

  // Обработчик клика по кнопке "Show more"
  _handleMoreButtonClick() {
    const filmsContainer = document.querySelectorAll('.films-list__container')[0];
    const showMoreButton = document.querySelector('.films-list__show-more');

    let shownCardsNumber = filmsContainer.children.length;

    const cardsToShow = Math.min(shownCardsNumber + this._cardsCountStep, getAllMovies().length);

    while (shownCardsNumber < cardsToShow) {
      const filmCard = new FilmCard(getAllMovies()[shownCardsNumber]);
      renderDOMElement(filmsContainer, filmCard, Positions.BEFOREEND);
      shownCardsNumber++;
    }
    if (shownCardsNumber === getAllMovies().length) {
      showMoreButton.remove();
    }
  }

  // Обработчик клика по любому контейнеру с фильмами
  // Содержит в себе открытие и закрытие попапа, добавление и удаление фильма
  // в категорию при клике на соотв. кнопку в карточке и в попапе
  _handleContainerClick() {
    const cardsContainers = document.querySelectorAll('.films-list__container');
    const popupContainer = document.querySelector('.footer');

    // Открытие попапа
    cardsContainers.forEach((cardsContainer) => {
      cardsContainer.addEventListener('click', (clickEvt) => {
        clickEvt.preventDefault();
        clickEvt.stopImmediatePropagation();

        const targetId = clickEvt.target.closest('article').getAttribute('data-id');
        const movieItem = getMovieById(getAllMovies(), targetId);
        const {comments} = movieItem;
        const filmPopup = new FilmPopup(movieItem);
        const activePopup = document.querySelector('.film-details');

        if (activePopup) {
          activePopup.remove();
        }

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

          // Обработчик клика по контролам попапа
          const container = popup.querySelector('.film-details__top-container');

          popup.addEventListener('click', (controlClickEvt) => {
            if (controlClickEvt.target.classList.contains('film-details__control-button')) {
              controlClickEvt.preventDefault();
              controlClickEvt.stopPropagation();
              const option = controlClickEvt.target.getAttribute('id');
              this._updateUserDetails(targetId, option);
              this._renderPopupControls(container, targetId);
            }
          });

          // Закрытие попапа
          const closePopupByEsc = (keyDownEvt) => {
            if (isEscEvent(keyDownEvt)) {
              popup.remove();
              document.removeEventListener('keydown', closePopupByEsc);
              document.body.style.overflow = '';
              // обновляем данные при закрытии попапа
              this._renderSingleCard(cardsContainers, targetId);
            }
          };

          const closePopupByClick = () => {
            popup.remove();
            document.removeEventListener('keydown', closePopupByEsc);
            document.body.style.overflow = '';
            // обновляем данные при закрытии попапа
            this._renderSingleCard(cardsContainers, targetId);
          };

          document.addEventListener('keydown', closePopupByEsc);
          closeButton.addEventListener('click', closePopupByClick);

          // Отрисовка комментариев
          comments.forEach((commentItem) => {
            const comment = new CommentItem(commentItem).getElement();
            renderDOMElement(commentsContainer, comment, Positions.BEFOREEND);
          });
        }

        // Если клик по контролам карточки фильма
        if (clickEvt.target.classList.contains('film-card__controls-item')) {
          const oldCard = clickEvt.target.closest('article');
          const id = oldCard.getAttribute('data-id');
          const option = clickEvt.target.getAttribute('data-details');

          this._updateUserDetails(id, option);
          this._renderFiltersMenu(getAllMovies());
          this._renderUserRank(getWatchedMovies());
          this._renderSingleCard(cardsContainers, id);
        }
      });
    });
  }

  // отрисовка основного и дополнительных контейнеров
  _renderCardsContainers() {
    this._listsContainer.setClickCallback(this._handleContainerClick);

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

  // обновление данных в хранилище о при добавлении или удалении фильма в категорию
  _updateUserDetails(movieId, option) {
    const movieData = getMovieById(moviesData, movieId);
    movieData.userDetails[option] = !movieData.userDetails[option];
  }

  // отрисовка всего списка фильмов
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

  // Функция отрисовки карточек в дополнительных контейнерах
  _renderExtraData(container, data) {
    const numberToShow = Math.min(data.length, NUMBER_OF_EXTRA_CARDS);
    for (let i = 0; i < numberToShow; i++) {
      const filmCard = new FilmCard(data[i]);
      renderDOMElement(container, filmCard, Positions.BEFOREEND);
    }
  }

  // Отрисовка карточек в top rated
  _renderTopRated(data) {
    const topRatedContainer = document.querySelectorAll('.films-list__container')[1];
    this._renderExtraData(topRatedContainer, sortByRating(data));
  }

  // Отрисовка карточек в most commented
  _renderMostCommented(data) {
    const mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];
    this._renderExtraData(mostCommentedContainer, sortByCommentsNumber(data));
  }

  // Обновление данных одной карточки во всех местах, где она отображается
  _renderSingleCard(containers, id) {
    containers.forEach((container) => {
      const cards = [...container.children];
      const oldCard = cards.find((card) => card.getAttribute('data-id') === id);
      if (oldCard) {
        const movieIndex = getMovieIndexById(moviesData, id);
        const newCard = new FilmCard(moviesData[movieIndex]);

        replaceDOMElement(container, newCard, oldCard);
      }
    });
  }

  // Рендер блока с контродами в попапе
  _renderPopupControls(container, movieId) {
    const movieIndex = getMovieIndexById(moviesData, movieId);
    const newControls = new PopupControls(moviesData[movieIndex]);
    const oldControls = container.querySelector('.film-details__controls');
    replaceDOMElement(container, newControls, oldControls);
  }
}
