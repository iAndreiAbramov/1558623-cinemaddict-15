import AbstractView from './abstract-view';

const getSortPanelHtml = (option) => `
  <ul class="sort">
    <li><a href="#" class="sort__button ${option === 'default' ? 'sort__button--active' : ''}" data-sort="default">Sort by default</a></li>
    <li><a href="#" class="sort__button ${option === 'date' ? 'sort__button--active' : ''}" data-sort="date">Sort by date</a></li>
    <li><a href="#" class="sort__button ${option === 'rating' ? 'sort__button--active' : ''}" data-sort="rating">Sort by rating</a></li>
  </ul>
`;

export default class SortMenu extends AbstractView {
  constructor(option) {
    super();
    this._option = option;
    this._clickCallback = this._clickCallback.bind(this);
  }

  getTemplate() {
    return getSortPanelHtml(this._option);
  }

  _clickCallback(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickCallback(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickCallback);
  }
}
