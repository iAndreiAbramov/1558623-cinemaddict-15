import AbstractView from './abstract-view';

const getNumberOfFilmsHtml = (data) => `
    <p>${data.length} movies inside</p>
  `;

export default class NumberOfFilms extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getNumberOfFilmsHtml(this._data);
  }
}
