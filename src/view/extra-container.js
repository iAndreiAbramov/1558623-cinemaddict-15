import AbstractView from './abstract-view';

const getExtraContainerHtml = (title) => `
  <section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>
`;

export default class ExtraContainer extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return getExtraContainerHtml(this._title);
  }
}
