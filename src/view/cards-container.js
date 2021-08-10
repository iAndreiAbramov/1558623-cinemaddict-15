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
  }

  getTemplate() {
    return getCardsContainerHtml(this._title);
  }
}
