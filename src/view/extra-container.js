import {createElement} from '../services/utils';

const getExtraContainerHtml = (title) => `
  <section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>
`;

export default class ExtraContainer {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  getTemplate() {
    return createElement(getExtraContainerHtml(this._title));
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
