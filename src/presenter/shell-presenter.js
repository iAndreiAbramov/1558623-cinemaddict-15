import FilmsListContainer from '../view/films-list-container';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, insertDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortMenu from '../view/sort-menu';
import {getMovieById} from '../utils/common';
import FilmsListPresenter from './films-list-presenter';
import ExtraPresenter from './extra-presenter';
import PopupPresenter from './popup-presenter';
import {sortData} from '../utils/sort-data';
import {Filters, SortOptions, UpdateType, Screens} from '../const';
import Stats from '../view/stats';
import ChartView from '../view/chart';
import {ChartOptions} from '../const';

export default class ShellPresenter {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._userRankContainer = document.querySelector('.header');
    this._mainContainer = document.querySelector('.main');
    this._numberOfFilmsContainer = document.querySelector('.footer__statistics');

    this._filmsContainer = new FilmsListContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._handlePopupOpen = this._handlePopupOpen.bind(this);
    this._handleCategoryToggle = this._handleCategoryToggle.bind(this);
    this._handleSortMenuClick = this._handleSortMenuClick.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSwitchToStats = this._handleSwitchToStats.bind(this);
    this._handleSwitchToFilms = this._handleSwitchToFilms.bind(this);

    this._filmListPresenter = null;
    this._extraPresenter = null;

    this._listsContainer = null;
    this._userRank = null;
    this._filtersMenu = null;
    this._sortMenu = null;
    this._popup = null;
    this._stats = null;

    this._currentScreen = Screens.FILMS;
    this._currentSortOption = SortOptions.DEFAULT;
    this._currentMenuOption = Filters.ALL;

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
        this._filmListPresenter.renderDefault(this._getMovies(Filters[this._currentMenuOption]));
        this._renderExtraContainers();
        break;
      case UpdateType.COMMENT:
        this._filmListPresenter.clear();
        this._filmListPresenter.renderDefault(this._getMovies(Filters[this._currentMenuOption]));
        this._renderExtraContainers();
        break;
    }
  }

  _renderStats() {
    this._stats = new Stats(this._getMovies(Filters.HISTORY), this._userRank.rank);
    insertDOMElement(this._filtersMenu, this._stats, Positions.AFTEREND);
  }

  _handleSwitchToStats(evt) {
    if (this._currentScreen !== Screens.STATS) {
      this._currentMenuOption = evt.target.dataset.option;
      this._currentScreen = evt.target.dataset.screen;
      this._destroyListsAndSort();
      this._renderFiltersMenu();
      this._renderStats();
      this._renderChart();
      this._currentScreen = Screens.STATS;
    }
  }

  _renderChart() {
    this._chart = new ChartView(this._getMovies(Filters.HISTORY), ChartOptions);
    insertDOMElement(this._stats.getElement(), this._chart, Positions.BEFOREEND);
    this._chart.render();
  }

  _handleSwitchToFilms(evt) {
    this._currentMenuOption = evt.target.dataset.option;
    this._stats.getElement().remove();
    this._renderFiltersMenu();
    this._renderSortMenu();
    this._renderFilmsContainers();
    this._renderFilmsList(this._getMovies(Filters[this._currentMenuOption]));
    this._renderExtraContainers();
    this._currentScreen = Screens.FILMS;
  }

  _destroyListsAndSort() {
    this._sortMenu.getElement().remove();
    this._filmListPresenter.clear();
    this._extraPresenter.clear();
    this._listsContainer.getElement().remove();
    this._listsContainer = null;
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
    if (this._userRank) {
      this._userRank.getElement().remove();
    }
    this._userRank = new UserRankView(this._getMovies(Filters.HISTORY));
    insertDOMElement(this._userRankContainer, this._userRank, Positions.BEFOREEND);
  }

  _renderFiltersMenu() {
    if (this._filtersMenu) {
      this._filtersMenu.remove();
    }
    const filtersData = {
      watchlist: this._getMovies(Filters.WATCHLIST),
      history: this._getMovies(Filters.HISTORY),
      favorite: this._getMovies(Filters.FAVORITE),
    };
    const filtersMenu = new FiltersMenu(
      filtersData,
      Filters[this._currentMenuOption] || null,
      this._currentScreen,
    );
    filtersMenu.setFilterToggleCallback(this._handleFilterChange);
    filtersMenu.setSwitchToStatsCallback(this._handleSwitchToStats);
    filtersMenu.setSwitchToFilmsCallback(this._handleSwitchToFilms);
    this._filtersMenu = filtersMenu.getElement();
    insertDOMElement(this._mainContainer, filtersMenu, Positions.AFTERBEGIN);
  }

  _renderSortMenu(option = 'default') {
    if (this._sortMenu) {
      this._sortMenu.getElement().remove();
    }
    this._sortMenu = new SortMenu(option);
    this._sortMenu.setClickCallback(this._handleSortMenuClick);
    insertDOMElement(this._filtersMenu, this._sortMenu.getElement(), Positions.AFTEREND);
  }

  _renderFilmsContainers() {
    if (this._listsContainer) {
      return;
    }
    this._listsContainer = new ListsContainer();
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
  }

  _renderExtraContainers() {
    if (this._extraPresenter) {
      this._extraPresenter.clear();
    }
    const extraContainers = new ExtraPresenter(this._getMovies());
    extraContainers.init();
    this._extraPresenter = extraContainers;
  }

  _handleSortTypeChange(option) {
    this._renderFilmsList(this._getMovies(Filters[this._currentMenuOption]));
    this._renderSortMenu(option);
  }

  _handleFilterChange(evt) {
    this._renderFilmsContainers();
    this._currentScreen = evt.target.dataset.screen;
    const filter = evt.target.dataset.option;
    if (this._currentMenuOption === filter) {
      return;
    }
    this._currentMenuOption = filter;
    this._currentSortOption = SortOptions.DEFAULT;
    this._renderFilmsList(this._getMovies(Filters[filter]));
    this._renderFiltersMenu();
    this._renderSortMenu();
  }

  _handleSortMenuClick(evt) {
    const sortOption = evt.target.dataset.sort;
    if (sortOption !== this._currentSortOption) {
      this._currentSortOption = sortOption;
      this._handleSortTypeChange(sortOption);
    }
  }

  _handlePopupOpen(evt) {
    if (!this._popup || !this._popup.isOpened) {
      const targetId = +evt.target.closest('article').getAttribute('data-id');
      const movieItem = getMovieById(this._getMovies(), targetId);
      const filmPopup = new PopupPresenter(movieItem, this._moviesModel);
      filmPopup.init();
      this._popup = filmPopup;
    }
  }

  _handleCategoryToggle(evt) {
    if (!this._popup || !this._popup.isOpened) {
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
