import FilmsListContainer from '../view/films-list-container';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, insertDOMElement, replaceDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortPanel from '../view/sort-panel';
import FilmCard from '../view/film-card';
import {getAllMovies, getWatchedMovies} from '../modules/data-filters';
import {getMovieById} from '../utils/common';
import FilmsListPresenter from './films-list-presenter';
import ExtraPresenter from './extra-presenter';
import PopupPresenter from './popup-presenter';
import {updateUserDetails} from '../modules/data-updaters';

export default class ShellPresenter {
  constructor(initialData) {
    this._initialData = initialData;
    this._userRankContainer = document.querySelector('.header');
    this._mainContainer = document.querySelector('.main');
    this._numberOfFilmsContainer = document.querySelector('.footer__statistics');
    this._sortPanel = new SortPanel();
    this._listsContainer = new ListsContainer();
    this._filmsContainer = new FilmsListContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._filmList = null;
    this._shownMainCards = null;
    this._shownTopRated = null;
    this._shownMostCommented = null;
    this._previusPopup = null;
    this._handleContainerClick = this._handleContainerClick.bind(this);
    this._PreviousStates = {
      userRank: null,
      filtersMenu: null,
      sortPanel: null,
    };
  }

  init() {
    this._renderFilmsNumber(this._initialData);
    this._renderUserRank(this._initialData);
    this._renderFiltersMenu(this._initialData);
    this._renderSortPanel();
    this._renderFilmsContainers();
    this._renderFilmsList(this._initialData);
    this._renderExtraContainers();
  }

  // Рендер поля с количеством фильмов в базе
  _renderFilmsNumber(data) {
    const numberOfFilms = new NumberOfFilms(data);
    insertDOMElement(this._numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
  }

  // Рендер поля ранга пользователя
  _renderUserRank(data) {
    if (this._PreviousStates.userRank) {
      this._PreviousStates.userRank.remove();
    }
    const userRank = new UserRankView(data);
    this._PreviousStates.userRank = userRank.getElement();
    insertDOMElement(this._userRankContainer, userRank, Positions.BEFOREEND);
  }

  // Рендер меню фильтров
  _renderFiltersMenu(data) {
    if (this._PreviousStates.filtersMenu) {
      this._PreviousStates.filtersMenu.remove();
    }
    const filtersMenu = new FiltersMenu(data);
    this._PreviousStates.filtersMenu = filtersMenu.getElement();
    insertDOMElement(this._mainContainer, filtersMenu, Positions.AFTERBEGIN);
  }

  // Отрисовка панели сортировки
  _renderSortPanel() {
    if (this._PreviousStates.sortPanel) {
      this._PreviousStates.sortPanel.remove();
    }
    this._PreviousStates.sortPanel = this._sortPanel;
    insertDOMElement(this._mainContainer, this._sortPanel, Positions.BEFOREEND);
  }

  // отрисовка основного и дополнительных контейнеров
  _renderFilmsContainers() {
    this._listsContainer.setClickCallback(this._handleContainerClick);
    insertDOMElement(this._mainContainer, this._listsContainer, Positions.BEFOREEND);

    insertDOMElement(this._listsContainer, this._filmsContainer, Positions.AFTERBEGIN);
    insertDOMElement(this._listsContainer, this._topRatedContainer, Positions.BEFOREEND);
    insertDOMElement(this._listsContainer, this._mostCommentedContainer, Positions.BEFOREEND);
  }

  // Перерисовка списка фильмов
  _renderFilmsList(data) {
    this._filmList = new FilmsListPresenter(data);
    this._filmList.init();
    this._shownMainCards = this._filmList.shownCards;
  }

  // Обновление данных в доп. контейнерах
  _renderExtraContainers() {
    const extraContainers = new ExtraPresenter();
    extraContainers.init();
    this._shownTopRated = extraContainers.shownTopRated;
    this._shownMostCommented = extraContainers.shownMostCommented;
  }

  // Обработчик клика по любому контейнеру с фильмами
  // Содержит в себе открытие попапа, добавление и удаление фильма
  // в категорию при клике на соотв. кнопку в карточке
  _handleContainerClick(evt) {
    // Открытие попапа
    if (
      evt.target.classList.contains('film-card__poster') ||
      evt.target.classList.contains('film-card__title') ||
      evt.target.classList.contains('film-card__comments')
    ) {
      const targetId = +evt.target.closest('article').getAttribute('data-id');
      const movieItem = getMovieById(getAllMovies(), targetId);
      if (!this._previusPopup || !this._previusPopup.isOpened) {
        const filmPopup = new PopupPresenter(movieItem);
        filmPopup.init();
        this._previusPopup = filmPopup;
      }
    }
    // Если клик по контролам карточки фильма
    if (evt.target.classList.contains('film-card__controls-item')) {
      const oldCard = evt.target.closest('article');
      const id = +oldCard.getAttribute('data-id');
      const option = evt.target.getAttribute('data-details');

      updateUserDetails(id, option);
      this._renderFiltersMenu(getAllMovies());
      this._renderUserRank(getWatchedMovies());
      this._updateAllCardInstances(id);
    }
  }

  // Обновление данных одной карточки во всех местах, где она отображается
  _updateAllCardInstances(id) {
    this._updateMainList(id);
    this._updateTopRated(id);
    this._updateMostCommented(id);
  }

  _updateMainList(id) {
    const newCard = new FilmCard(getMovieById(getAllMovies(), id));
    const oldCard = this._shownMainCards.get(id);
    const container = this._listsContainer.getElement().querySelectorAll('.films-list__container')[0];
    if (oldCard) {
      replaceDOMElement(container, newCard, oldCard);
      this._shownMainCards.set(id, newCard.getElement());
    }
  }

  _updateTopRated(id) {
    const newCard = new FilmCard(getMovieById(getAllMovies(), id));
    const oldCard = this._shownTopRated.get(id);
    const container = this._listsContainer.getElement().querySelectorAll('.films-list__container')[1];
    if (oldCard) {
      replaceDOMElement(container, newCard, oldCard);
      this._shownTopRated.set(id, newCard.getElement());
    }
  }

  _updateMostCommented(id) {
    const newCard = new FilmCard(getMovieById(getAllMovies(), id));
    const oldCard = this._shownMostCommented.get(id);
    const container = this._listsContainer.getElement().querySelectorAll('.films-list__container')[2];
    if (oldCard) {
      replaceDOMElement(container, newCard, oldCard);
      this._shownMostCommented.set(id, newCard.getElement());
    }
  }
}
