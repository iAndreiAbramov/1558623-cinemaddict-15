import {createElement} from '../services/utils';

const getCardsContainerHtml = (title) => `
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">${title}</h2>
    <div class="films-list__container"></div>
  </section>
`;

export default class CardsContainer {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  getTemplate() {
    return createElement(getCardsContainerHtml(this._title));
  }

  getElement()  {
    if (!this._element) {
      this._element = this.getTemplate();
    }
    return this._element;
  }

  deleteElement() {
    this._element = null;
  }
}
