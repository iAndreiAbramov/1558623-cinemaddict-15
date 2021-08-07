import {createElement} from '../services/utils';

const getListsContainerHtml = () => `
    <section class="films"></section>
`;

export default class ListsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createElement(getListsContainerHtml());
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
