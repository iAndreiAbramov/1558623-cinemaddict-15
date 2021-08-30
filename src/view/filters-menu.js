import AbstractView from './abstract-view';

const getFiltersMenuHtml = (data, option) => {
  const {watchlist, history, favorite} = data;
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${option === null ? 'main-navigation__item--active' : ''}" data-option="ALL">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${option === 'watchlist' ? 'main-navigation__item--active' : ''}" data-option="WATCHLIST">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
        <a href="#history" class="main-navigation__item ${option === 'alreadyWatched' ? 'main-navigation__item--active' : ''}" data-option="HISTORY">History <span class="main-navigation__item-count ">${history.length}</span></a>
        <a href="#favorites" class="main-navigation__item ${option === 'favorite' ? 'main-navigation__item--active' : ''}" data-option="FAVORITE">Favorites <span class="main-navigation__item-count">${favorite.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional ${option === 'stats' ? 'main-navigation__item--active' : ''}" data-option="STATS">Stats</a>
    </nav>
  `;
};

export default class FiltersMenu extends AbstractView {
  constructor(data, option) {
    super();
    this._data = data;
    this._option = option;
    this._filterToggleCallback = this._filterToggleCallback.bind(this);
    this._switchToStatsCallback = this._switchToStatsCallback.bind(this);
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

  setFilterToggleCallback(callback) {
    this._callback.filterToggle = callback;
    this.getElement().addEventListener('click', this._filterToggleCallback);
  }

  setSwitchToStatsCallback(callback) {
    this._callback.switchToStats = callback;
    this.getElement().addEventListener('click', this._switchToStatsCallback);
  }
}
