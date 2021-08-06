import {createElement} from '../services/utils';

const getMoreHtml = () => `
  <button class="films-list__show-more">Show more</button>
`;

export default class MoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createElement(getMoreHtml());
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
