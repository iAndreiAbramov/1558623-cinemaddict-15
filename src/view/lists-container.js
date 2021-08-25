import AbstractView from './abstract-view';

const getListsContainerHtml = () => `
    <section class="films"></section>
`;

export default class ListsContainer extends AbstractView {
  constructor() {
    super();
    this._categoryToggleCallback = this._categoryToggleCallback.bind(this);
    this._popupOpenCallback = this._popupOpenCallback.bind(this);
  }

  getTemplate() {
    return getListsContainerHtml();
  }

  _categoryToggleCallback(evt) {
    if (evt.target.classList.contains('film-card__controls-item')) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      this._callback.click(evt);
    }
  }

  setCategoryToggleCallback(callback) {
    this._callback.click = callback;
    if (this.getElement()) {
      this.getElement().addEventListener('click', this._categoryToggleCallback);
    }
  }

  _popupOpenCallback(evt) {
    evt.preventDefault();
    if (
      evt.target.classList.contains('film-card__poster') ||
      evt.target.classList.contains('film-card__title') ||
      evt.target.classList.contains('film-card__comments')
    ) {
      this._callback.popupOpen(evt);
    }
  }

  setPopupOpenCallback(callback) {
    this._callback.popupOpen = callback;
    this.getElement().addEventListener('click', this._popupOpenCallback);
  }
}
