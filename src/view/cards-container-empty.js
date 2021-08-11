import AbstractView from './abstract-view';

const getMessageForEmptyHtml = (title) => `
      <h2 class="films-list__title">${title}</h2>
`;

export default class MessageForEmpty extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return getMessageForEmptyHtml(this._title);
  }
}
