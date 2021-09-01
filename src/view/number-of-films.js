import AbstractView from './abstract-view';

const getNumberOfFilmsHtml = (data) => {
  data = data || [];
  return `
    <p>${data.length} movies inside</p>
  `;
};

export default class NumberOfFilms extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getNumberOfFilmsHtml(this._data);
  }
}
