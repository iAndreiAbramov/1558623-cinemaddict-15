import FilmsListContainer from '../view/films-list-container';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, insertDOMElement, replaceDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortMenu from '../view/sort-menu';
import {getMovieById} from '../utils/common';
import FilmsListPresenter from './films-list-presenter';
import ExtraPresenter from './extra-presenter';
import PopupPresenter from './popup-presenter';
import {sortData} from '../utils/sort-data';
import {Filters, SortOptions, UpdateType} from '../const';

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
    this._handleSortMenuClick = this._handleSortMenuClick.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmListPresenter = null;
    this._extraPresenter = null;
    this._shownMainCards = null;
    this._shownTopRated = null;
    this._shownMostCommented = null;
    this._PreviousStates = {
      userRank: null,
      filtersMenu: null,
      sortMenu: null,
      popup: null,
    };

    this._currentSortOption = SortOptions.DEFAULT;
    this._currentFilter = Filters.ALL;

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

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.ALL_LISTS_SOFT:
        this._renderFiltersMenu();
        this._renderUserRank();
        this._filmListPresenter.clear();
        this._filmListPresenter.renderDefault(this._getMovies(Filters[this._currentFilter]));
        this._renderExtraContainers();
        break;
      case UpdateType.COMMENT:
        this._filmListPresenter.clear();
        this._filmListPresenter.renderDefault(this._getMovies(Filters[this._currentFilter]));
        this._renderExtraContainers();
        break;
      // case 'ALL_LISTS_HARD':
      //   this._renderFiltersMenu();
      //   this._renderUserRank();
      //   this._renderFilmsList(this._getMovies(Filters[this._currentFilter]));
      //   this._renderExtraContainers();
      //   break;
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

  _renderFilmsNumber(data) {
    const numberOfFilms = new NumberOfFilms(data);
    insertDOMElement(this._numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
  }

  _renderUserRank() {
    if (this._PreviousStates.userRank) {
      this._PreviousStates.userRank.remove();
    }
    const userRank = new UserRankView(this._getMovies(Filters.HISTORY));
    this._PreviousStates.userRank = userRank.getElement();
    insertDOMElement(this._userRankContainer, userRank, Positions.BEFOREEND);
  }

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
    this._currentSortOption = SortOptions.DEFAULT;
    this._renderFilmsList(this._getMovies(Filters[filter]));
    this._renderFiltersMenu();
    this._renderSortMenu();
  }

  _renderSortMenu(option = 'default') {
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
    this._renderFilmsList(this._getMovies(Filters[this._currentFilter]));
    this._renderSortMenu(option);
  }

  _handleSortMenuClick(evt) {
    const sortOption = evt.target.dataset.sort;
    if (sortOption !== this._currentSortOption) {
      this._currentSortOption = sortOption;
      this._handleSortTypeChange(sortOption);
    }
  }

  _renderFilmsContainers() {
    this._listsContainer.setPopupOpenCallback(this._handlePopupOpen);
    this._listsContainer.setCategoryToggleCallback(this._handleCategoryToggle);
    insertDOMElement(this._mainContainer, this._listsContainer, Positions.BEFOREEND);
    insertDOMElement(this._listsContainer, this._filmsContainer, Positions.AFTERBEGIN);
    insertDOMElement(this._listsContainer, this._topRatedContainer, Positions.BEFOREEND);
    insertDOMElement(this._listsContainer, this._mostCommentedContainer, Positions.BEFOREEND);
  }

  _renderFilmsList(data) {
    if (this._filmListPresenter) {
      this._filmListPresenter.clear();
    }
    this._filmListPresenter = new FilmsListPresenter(data);
    this._filmListPresenter.init();
    this._shownMainCards = this._filmListPresenter.shownCards;
  }

  _renderExtraContainers() {
    if (this._extraPresenter) {
      this._extraPresenter.clear();
    }
    const extraContainers = new ExtraPresenter(this._getMovies());
    extraContainers.init();
    this._shownTopRated = extraContainers.shownTopRated;
    this._shownMostCommented = extraContainers.shownMostCommented;
    this._extraPresenter = extraContainers;
  }

  _handlePopupOpen(evt) {
    if (!this._PreviousStates.popup || !this._PreviousStates.popup.isOpened) {
      const targetId = +evt.target.closest('article').getAttribute('data-id');
      const movieItem = getMovieById(this._getMovies(), targetId);
      const filmPopup = new PopupPresenter(movieItem, this._moviesModel);
      filmPopup.init();
      this._PreviousStates.popup = filmPopup;
    }
  }

  _handleCategoryToggle(evt) {
    if (!this._PreviousStates.popup || !this._PreviousStates.popup.isOpened) {
      const oldCard = evt.target.closest('article');
      const id = +oldCard.dataset.id;
      const option = evt.target.dataset.details;
      const updatedMovie = Object.assign(
        {},
        getMovieById(this._getMovies(), id),
      );
      updatedMovie.userDetails[option] = !updatedMovie.userDetails[option];
      this._moviesModel.updateMovie(UpdateType.ALL_LISTS_SOFT, updatedMovie);
    }
  }
}
