import AbstractView from './abstract-view';

const getListsContainerHtml = () => `
    <section class="films"></section>
`;

export default class ListsContainer extends AbstractView {
  constructor() {
    super();
    this._clickCallback = this._clickCallback.bind(this);
  }

  getTemplate() {
    return getListsContainerHtml();
  }

  _clickCallback(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    this._callback.click(evt);
  }

  setClickCallback(callback) {
    this._callback.click = callback;
    if (this.getElement()) {
      this.getElement().addEventListener('click',this._clickCallback);
    }
  }
}
