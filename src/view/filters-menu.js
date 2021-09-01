import AbstractView from './abstract-view';
import {Screens} from '../const';

const getFiltersMenuHtml = (data, option) => {
  const {watchlist, history, favorite} = data;
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a class="main-navigation__item ${option === null ? 'main-navigation__item--active' : ''}" data-option="ALL" data-screen="films">All movies</a>
        <a class="main-navigation__item ${option === 'watchlist' ? 'main-navigation__item--active' : ''}" data-option="WATCHLIST" data-screen="films">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
        <a class="main-navigation__item ${option === 'alreadyWatched' ? 'main-navigation__item--active' : ''}" data-option="HISTORY" data-screen="films">History <span class="main-navigation__item-count ">${history.length}</span></a>
        <a class="main-navigation__item ${option === 'favorite' ? 'main-navigation__item--active' : ''}" data-option="FAVORITE" data-screen="films">Favorites <span class="main-navigation__item-count">${favorite.length}</span></a>
      </div>
      <a class="main-navigation__additional ${option === 'stats' ? 'main-navigation__item--active' : ''}" data-option="STATS" data-screen="stats">Stats</a>
    </nav>
  `;
};

export default class FiltersMenu extends AbstractView {
  constructor(data, option, screen) {
    super();
    this._data = data;
    this._option = option;
    this._screen = screen;
    this._filterToggleCallback = this._filterToggleCallback.bind(this);
    this._switchToStatsCallback = this._switchToStatsCallback.bind(this);
    this._switchToFilmsCallback = this._switchToFilmsCallback.bind(this);
  }

  getTemplate() {
    return getFiltersMenuHtml(this._data, this._option);
  }

  _filterToggleCallback(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('main-navigation__item')) {
      this._callback.filterToggle(evt);
    }
  }

  _switchToStatsCallback(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('main-navigation__additional')) {
      this._callback.switchToStats(evt);
    }
  }

  _switchToFilmsCallback(evt) {
    evt.preventDefault();
    if (
      evt.target.classList.contains('main-navigation__item') &&
      this._screen === Screens.STATS
    ) {
      this._callback._switchToFilms(evt);
    }
  }

  setFilterToggleCallback(callback) {
    this._callback.filterToggle = callback;
    this.getElement().addEventListener('click', this._filterToggleCallback);
  }

  setSwitchToStatsCallback(callback) {
    this._callback.switchToStats = callback;
    this.getElement().addEventListener('click', this._switchToStatsCallback);
  }

  setSwitchToFilmsCallback(callback) {
    this._callback._switchToFilms = callback;
    this.getElement().addEventListener('click', this._switchToFilmsCallback);
  }

  removeFilterToggleCallback() {
    this.getElement().removeEventListener('click', this._filterToggleCallback);
  }

  removeSwitchToStatsCallback() {
    this.getElement().removeEventListener('click', this._switchToStatsCallback);
  }

  removeSwitchToFilmsCallback() {
    this.getElement().removeEventListener('click', this._switchToFilmsCallback);
  }
}
