import {createElement} from '../services/utils';

const getNumberOfFilmsHtml = (data) => `
    <p>${data.length} movies inside</p>
  `;

export default class NumberOfFilms {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return getNumberOfFilmsHtml(this._data);
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
