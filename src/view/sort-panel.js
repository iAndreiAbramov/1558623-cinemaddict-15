import {createElement} from '../services/utils';

const getSortPanelHtml = () => `
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>
`;

export default class SortPanel {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getSortPanelHtml();
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
