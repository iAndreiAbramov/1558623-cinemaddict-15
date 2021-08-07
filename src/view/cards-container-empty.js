import {createElement} from '../services/utils';

const getMessageForEmptyHtml = (title) => `
      <h2 class="films-list__title">${title}</h2>
`;

export default class MessageForEmpty {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  getTemplate() {
    return createElement(getMessageForEmptyHtml(this._title));
  }

  getElement() {
    if (!this._element) {
      this._element = this.getTemplate();
    }
    return this._element;
  }

  deleteElement() {
    this._element = null;
  }
}
