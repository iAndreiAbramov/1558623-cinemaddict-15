import FilmsListContainer from '../view/films-list-container';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, insertDOMElement, replaceDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortMenu from '../view/sort-menu';
import FilmCard from '../view/film-card';
import {getMovieById} from '../utils/common';
import FilmsListPresenter from './films-list-presenter';
import ExtraPresenter from './extra-presenter';
import PopupPresenter from './popup-presenter';
import {sortData} from '../utils/sort-data';
import {Filters, UpdateType} from '../const';

export default class ShellPresenter {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._userRankContainer = document.querySelector('.header');
    this._mainContainer = document.querySelector('.main');
    this._numberOfFilmsContainer = document.querySelector('.footer__statistics');
    this._sortMenu = null;
    this._listsContainer = new ListsContainer();
    this._filmsContainer = new FilmsListContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._handlePopupOpen = this._handlePopupOpen.bind(this);
    this._handleCategoryToggle = this._handleCategoryToggle.bind(this);
    this._handlePopupClose = this._handlePopupClose.bind(this);
    this._handleSortMenuClick = this._handleSortMenuClick.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

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
    this._currentFilter = null;

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsNumber(this._getMovies());
    this._renderUserRank();
    this._renderFiltersMenu();
    this._renderSortMenu(this._currentSortOption);
    this._renderFilmsContainers();
    this._renderFilmsList(this._getMovies());
    this._renderExtraContainers();
  }

  _handleModelEvent(updateType, updateBody = {}) {
    switch (updateType) {
      case 'SINGLE_CARD_INSTANCES_AND_STATS':
        this._renderFiltersMenu();
        this._renderUserRank();
        this._updateAllCardInstances(updateBody.id);
        break;
    }
  }

  _getMovies(filter = null) {
    let data = this._moviesModel.getMovies();
    if (filter) {
      data = data.filter((movie) => movie.userDetails[filter]);
    }
    const option = this._currentSortOption;
    return sortData(data, option);
  }

  // Рендер поля с количеством фильмов в базе
  _renderFilmsNumber(data) {
    const numberOfFilms = new NumberOfFilms(data);
    insertDOMElement(this._numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
  }

  // Рендер поля ранга пользователя
  _renderUserRank() {
    if (this._PreviousStates.userRank) {
      this._PreviousStates.userRank.remove();
    }
    const userRank = new UserRankView(this._getMovies(Filters.HISTORY));
    this._PreviousStates.userRank = userRank.getElement();
    insertDOMElement(this._userRankContainer, userRank, Positions.BEFOREEND);
  }

  // Рендер меню фильтров
  _renderFiltersMenu() {
    if (this._PreviousStates.filtersMenu) {
      this._PreviousStates.filtersMenu.remove();
    }
    const filtersData = {
      watchlist: this._getMovies(Filters.WATCHLIST),
      history: this._getMovies(Filters.HISTORY),
      favorite: this._getMovies(Filters.FAVORITE),
    };
    const filtersMenu = new FiltersMenu(filtersData, Filters[this._currentFilter] || null);
    filtersMenu.setClickCallback(this._handleFilterChange);
    this._PreviousStates.filtersMenu = filtersMenu.getElement();
    insertDOMElement(this._mainContainer, filtersMenu, Positions.AFTERBEGIN);
  }

  _handleFilterChange(evt) {
    const filter = evt.target.dataset.filter;
    if (this._currentFilter === filter) {
      return;
    }
    this._currentFilter = filter;
    this._renderFilmsList(this._getMovies(Filters[filter]));
    this._renderFiltersMenu();
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

  _handleSortTypeChange(option) {
    this._renderFilmsList(this._getMovies(this._currentFilter));
    this._renderSortMenu(option);
  }

  _handleSortMenuClick(evt) {
    const sortOption = evt.target.dataset.sort;
    if (sortOption !== this._currentSortOption) {
      this._currentSortOption = sortOption;
      this._handleSortTypeChange(sortOption);
    }
  }

  // отрисовка основного и дополнительных контейнеров
  _renderFilmsContainers() {
    this._listsContainer.setPopupOpenCallback(this._handlePopupOpen);
    this._listsContainer.setCategoryToggleCallback(this._handleCategoryToggle);
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
    const extraContainers = new ExtraPresenter(this._getMovies());
    extraContainers.init();
    this._shownTopRated = extraContainers.shownTopRated;
    this._shownMostCommented = extraContainers.shownMostCommented;
  }

  _handlePopupOpen(evt) {
    if (!this._PreviousStates.popup || !this._PreviousStates.popup.isOpened) {
      const targetId = +evt.target.closest('article').getAttribute('data-id');
      const movieItem = getMovieById(this._getMovies(), targetId);
      const filmPopup = new PopupPresenter(movieItem, this._moviesModel);
      filmPopup.init();
      document.addEventListener('popupClose', this._handlePopupClose);
      this._PreviousStates.popup = filmPopup;
    }
  }

  _handleCategoryToggle(evt) {
    if (!this._PreviousStates.popup || !this._PreviousStates.popup.isOpened) {
      const oldCard = evt.target.closest('article');
      const id = +oldCard.getAttribute('data-id');
      const option = evt.target.getAttribute('data-details');

      this._moviesModel.updateMovie(
        UpdateType.SINGLE_CARD_INSTANCES_AND_STATS,
        {id, option},
      );

    }
  }

  // Обновление данных одной карточки во всех местах, где она отображается
  _updateAllCardInstances(id) {
    if (this._currentFilter === null) {
      this._updateMainList(id);
    } else {
      this._renderFilmsList(this._getMovies(this._currentFilter));
    }
    this._updateTopRated(id);
    this._updateMostCommented(id);
  }

  _updateMainList(id) {
    const newCard = new FilmCard(getMovieById(this._getMovies(), id));
    const oldCard = this._shownMainCards.get(id);
    const container = this._listsContainer.getElement().querySelectorAll('.films-list__container')[0];
    if (oldCard) {
      replaceDOMElement(container, newCard, oldCard);
      this._shownMainCards.set(id, newCard.getElement());
    }
  }

  _updateTopRated(id) {
    const newCard = new FilmCard(getMovieById(this._getMovies(), id));
    const oldCard = this._shownTopRated.get(id);
    const container = this._listsContainer.getElement().querySelectorAll('.films-list__container')[1];
    if (oldCard) {
      replaceDOMElement(container, newCard, oldCard);
      this._shownTopRated.set(id, newCard.getElement());
    }
  }

  _updateMostCommented(id) {
    const newCard = new FilmCard(getMovieById(this._getMovies(), id));
    const oldCard = this._shownMostCommented.get(id);
    const container = this._listsContainer.getElement().querySelectorAll('.films-list__container')[2];
    if (oldCard) {
      replaceDOMElement(container, newCard, oldCard);
      this._shownMostCommented.set(id, newCard.getElement());
    }
  }

  _handlePopupClose(evt) {
    this._updateAllCardInstances(evt.detail.id);
    this._renderFiltersMenu(this._getMovies());
    this._renderUserRank();
    document.removeEventListener('popupClose', this._handlePopupClose);
  }
}
