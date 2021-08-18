import FilmsListContainer from '../view/films-list-container';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, insertDOMElement, replaceDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortMenu from '../view/sort-menu';
import FilmCard from '../view/film-card';
import {getAllMovies, getWatchedMovies} from '../modules/data-filters';
import {getMovieById} from '../utils/common';
import FilmsListPresenter from './films-list-presenter';
import ExtraPresenter from './extra-presenter';
import PopupPresenter from './popup-presenter';
import {updateUserDetails} from '../modules/data-updaters';
import {dataSort} from '../modules/data-sort';

export default class ShellPresenter {
  constructor(initialData) {
    this._initialData = initialData;
    this._userRankContainer = document.querySelector('.header');
    this._mainContainer = document.querySelector('.main');
    this._numberOfFilmsContainer = document.querySelector('.footer__statistics');
    this._sortMenu = null;
    this._listsContainer = new ListsContainer();
    this._filmsContainer = new FilmsListContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._handleContainerClick = this._handleContainerClick.bind(this);
    this._handlePopupClose = this._handlePopupClose.bind(this);
    this._handleSortMenuClick = this._handleSortMenuClick.bind(this);
    this._filmList = null;
    this._shownMainCards = null;
    this._shownTopRated = null;
    this._shownMostCommented = null;
    this._PreviousStates = {
      userRank: null,
      filtersMenu: null,
      sortMenu: null,
      popup: null,
    };

    this._currentSortOption = 'default';
  }

  init() {
    this._renderFilmsNumber(this._initialData);
    this._renderUserRank(this._initialData);
    this._renderFiltersMenu(this._initialData);
    this._renderSortMenu(this._currentSortOption);
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
  _renderSortMenu(option) {
    this._sortMenu = new SortMenu(option);
    this._sortMenu.setClickCallback(this._handleSortMenuClick);
    if (this._PreviousStates.sortMenu) {
      replaceDOMElement(this._mainContainer, this._sortMenu, this._PreviousStates.sortMenu);
    } else {
      insertDOMElement(this._mainContainer, this._sortMenu, Positions.BEFOREEND);
    }
    this._PreviousStates.sortMenu = this._sortMenu.getElement();
  }

  _handleSortTypeChange(data, option) {
    const sortedData = dataSort(data, [option]);
    this._renderFilmsList(sortedData);
    this._renderSortMenu(option);
  }

  _handleSortMenuClick(evt) {
    const sortOption = evt.target.dataset.sort;
    if (sortOption !== this._currentSortOption) {

      //todo: пока не учитывается выбранный фильтр при сортировке
      this._handleSortTypeChange(getAllMovies(), sortOption);
      this._currentSortOption = sortOption;
    }
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
    if (this._filmList) {
      this._filmList.clear();
    }
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
    if (!this._PreviousStates.popup || !this._PreviousStates.popup.isOpened) {
      if (
        evt.target.classList.contains('film-card__poster') ||
        evt.target.classList.contains('film-card__title') ||
        evt.target.classList.contains('film-card__comments')
      ) {
        const targetId = +evt.target.closest('article').getAttribute('data-id');
        const movieItem = getMovieById(getAllMovies(), targetId);
        const filmPopup = new PopupPresenter(movieItem);
        filmPopup.init();
        document.addEventListener('popupClose', this._handlePopupClose);
        this._PreviousStates.popup = filmPopup;
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

  _handlePopupClose(evt) {
    this._updateAllCardInstances(evt.detail.id);
    this._renderFiltersMenu(getAllMovies());
    this._renderUserRank(getWatchedMovies());
    document.removeEventListener('popupClose', this._handlePopupClose);
  }
}
