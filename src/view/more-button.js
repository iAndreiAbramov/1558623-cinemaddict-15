import AbstractView from './abstract-view';

const getMoreHtml = () => `
  <button class="films-list__show-more">Show more</button>
`;

export default class MoreButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return getMoreHtml();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    if (this.getElement()) {
      this.getElement().addEventListener('click', this._clickHandler);
    }
  }
}
