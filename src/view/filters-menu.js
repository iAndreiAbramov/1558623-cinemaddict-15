import {getFavoriteMovies, getWatchedMovies, getWatchListMovies} from '../modules/data-filters';
import {createElement} from '../services/utils';

const getFiltersMenuHtml = (data) => `
  <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getWatchListMovies(data).length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getWatchedMovies(data).length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFavoriteMovies(data).length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
`;

export default class FiltersMenu {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return getFiltersMenuHtml(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  deleteElement() {
    this._element = null;
  }
}
