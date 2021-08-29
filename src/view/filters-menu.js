import AbstractView from './abstract-view';

const getFiltersMenuHtml = (data, option) => {
  const {watchlist, history, favorite} = data;
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${option === null ? 'main-navigation__item--active' : ''}" data-filter="ALL">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${option === 'watchlist' ? 'main-navigation__item--active' : ''}" data-filter="WATCHLIST">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
        <a href="#history" class="main-navigation__item ${option === 'alreadyWatched' ? 'main-navigation__item--active' : ''}" data-filter="HISTORY">History <span class="main-navigation__item-count ">${history.length}</span></a>
        <a href="#favorites" class="main-navigation__item ${option === 'favorite' ? 'main-navigation__item--active' : ''}" data-filter="FAVORITE">Favorites <span class="main-navigation__item-count">${favorite.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `;
};

export default class FiltersMenu extends AbstractView {
  constructor(data, option) {
    super();
    this._data = data;
    this._option = option;
    this._clickCallback = this._clickCallback.bind(this);
  }

  getTemplate() {
    return getFiltersMenuHtml(this._data, this._option);
  }

  _clickCallback(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('main-navigation__item')) {
      this._callback.click(evt);
    }
  }

  setClickCallback(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickCallback);
  }
}
