import AbstractView from './abstract-view';

const getCardsContainerHtml = (title) => `
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">${title}</h2>
    <div class="films-list__container"></div>
  </section>
`;

export default class CardsContainer extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
    this._clickCallback = this._clickCallback.bind(this);
  }

  getTemplate() {
    return getCardsContainerHtml(this._title);
  }

  _clickCallback(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickCallback(callback) {
    this._callback.click = callback;
    if (this.getElement()) {
      this.getElement().addEventListener('click', this._clickCallback);
    }
  }
}
