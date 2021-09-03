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
import {Filters, SortOptions, UpdateType, Screens, StatsFilters} from '../const';
import StatsContainer from '../view/stats-container';
import ChartView from '../view/chart';
import {ChartOptions} from '../const';
import {filterMoviesByPeriod} from '../utils/date';
import StatsSummary from '../view/stats-summary';
import LoadingMessage from '../view/loading-message';

export default class ShellPresenter {
  constructor(moviesModel, api) {
    this._moviesModel = moviesModel;
    this._api = api;
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
    this._handleStatsFilterToggle = this._handleStatsFilterToggle.bind(this);

    this._filmListPresenter = null;
    this._extraPresenter = null;

    this._userRank = null;
    this._numberOfFilms = null;
    this._filtersMenu = null;
    this._sortMenu = null;
    this._listsContainer = null;
    this._loadingMessage = null;
    this._popup = null;
    this._statsContainer = null;
    this._statsSummary = null;
    this._chart = null;

    this._currentScreen = Screens.FILMS;
    this._currentSortOption = SortOptions.DEFAULT;
    this._currentMenuOption = Filters.ALL;
    this._currentStatsFilter = StatsFilters.ALL;
    this._isLoading = true;

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._loadingMessage) {
      this._loadingMessage.getElement().remove();
      this._loadingMessage.deleteElement();
    }
    this._renderFiltersMenu();
    this._renderFilmsNumber(this._getMovies());
    if (this._isLoading) {
      this._filtersMenu.removeFilterToggleCallback(this._handleFilterChange);
      this._filtersMenu.removeSwitchToStatsCallback(this._handleSwitchToStats);
      this._filtersMenu.removeSwitchToFilmsCallback(this._handleSwitchToFilms);
      this._renderLoading();
    } else {
      this._renderUserRank();
      this._renderSortMenu(this._currentSortOption);
      this._renderFilmsContainers();
      this._renderFilmsList(this._getMovies());
      this._renderExtraContainers();
    }
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
      case UpdateType.INIT:
        this._isLoading = false;
        this.init();
    }
  }

  _renderLoading() {
    this._loadingMessage = new LoadingMessage();
    insertDOMElement(this._filtersMenu, this._loadingMessage, Positions.AFTEREND);
  }

  _handleStatsFilterToggle(evt) {
    evt.preventDefault();
    const filter = StatsFilters[evt.target.dataset.filter];
    if (filter !== this._currentStatsFilter) {
      this._currentStatsFilter = filter;
      const movies = this._getMovies(Filters.HISTORY, this._currentStatsFilter);
      this._statsContainer.getElement().remove();
      this._statsSummary.getElement().remove();
      this._chart.getElement().remove();
      this._renderStatsContainer();
      this._renderStatsSummary(movies);
      if (movies.length) {
        this._renderChart(movies);
      }
    }
  }

  _handleSwitchToStats(evt) {
    evt.preventDefault();
    if (this._currentScreen !== Screens.STATS) {
      this._currentMenuOption = evt.target.dataset.option;
      this._currentScreen = evt.target.dataset.screen;
      this._destroyListsAndSort();
      this._renderFiltersMenu();
      this._renderStatsContainer();
      this._renderStatsSummary(this._getMovies(Filters.HISTORY, this._currentStatsFilter));
      this._renderChart(this._getMovies(Filters.HISTORY, this._currentStatsFilter));
      this._currentScreen = Screens.STATS;
    }
  }

  _renderStatsContainer() {
    this._statsContainer = new StatsContainer(this._userRank.rank, this._currentStatsFilter);
    this._statsContainer.setFilterClickHandler(this._handleStatsFilterToggle);
    insertDOMElement(this._filtersMenu, this._statsContainer, Positions.AFTEREND);
  }

  _renderStatsSummary(movies) {
    this._statsSummary = new StatsSummary(movies);
    insertDOMElement(this._statsContainer.getElement(), this._statsSummary, Positions.BEFOREEND);
  }

  _renderChart(movies, options = ChartOptions) {
    this._chart = new ChartView(movies, options);
    insertDOMElement(this._statsContainer.getElement(), this._chart, Positions.BEFOREEND);
    this._chart.render();
  }

  _handleSwitchToFilms(evt) {
    evt.preventDefault();
    this._currentMenuOption = evt.target.dataset.option;
    this._statsContainer.getElement().remove();
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

  _getMovies(filter = null, period = null) {
    let data = this._moviesModel.getMovies();
    if (filter) {
      data = data.filter((movie) => movie.userDetails[filter]);
    }
    if (period) {
      data = filterMoviesByPeriod(data, this._currentStatsFilter);
    }
    const option = this._currentSortOption;
    return sortData(data, option);
  }

  _renderFilmsNumber(data) {
    if (this._numberOfFilms) {
      this._numberOfFilms.getElement().remove();
    }
    this._numberOfFilms = new NumberOfFilms(data);
    insertDOMElement(this._numberOfFilmsContainer, this._numberOfFilms, Positions.BEFOREEND);
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
      this._filtersMenu.getElement().remove();
    }
    const filtersData = {
      watchlist: this._getMovies(Filters.WATCHLIST),
      history: this._getMovies(Filters.HISTORY),
      favorite: this._getMovies(Filters.FAVORITE),
    };
    this._filtersMenu = new FiltersMenu(
      filtersData,
      Filters[this._currentMenuOption] || null,
      this._currentScreen,
    );
    this._filtersMenu.setFilterToggleCallback(this._handleFilterChange);
    this._filtersMenu.setSwitchToStatsCallback(this._handleSwitchToStats);
    this._filtersMenu.setSwitchToFilmsCallback(this._handleSwitchToFilms);
    insertDOMElement(this._mainContainer, this._filtersMenu, Positions.AFTERBEGIN);
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

  _renderFilmsList(data, filter) {
    if (this._filmListPresenter) {
      this._filmListPresenter.clear();
    }
    this._filmListPresenter = new FilmsListPresenter(data, filter);
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
    evt.preventDefault();
    this._renderFilmsContainers();
    this._currentScreen = evt.target.dataset.screen;
    const filter = evt.target.dataset.option;
    if (this._currentMenuOption === filter) {
      return;
    }
    this._currentMenuOption = filter;
    this._currentSortOption = SortOptions.DEFAULT;
    this._renderFilmsList(this._getMovies(Filters[filter]), filter);
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
      const filmPopup = new PopupPresenter(movieItem, this._moviesModel, this._api);
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
      this._api.putMovie(id, this._moviesModel.adaptMovieToServer(updatedMovie))
        .then((movie) => this._moviesModel.updateMovie(
          UpdateType.ALL_LISTS_SOFT,
          this._moviesModel.adaptMovieToClient(movie),
        ));
    }
  }
}
