import AbstractView from './abstract-view';
import {replaceDOMElement} from '../utils/render';

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._state = {};
  }

  updateData(update) {
    if (!update) {
      return;
    }
    this._state = Object.assign(
      {},
      this._state,
      update,
    );
  }

  updateElement() {
    const oldElement = this.getElement();
    const container = oldElement.parentElement;
    this.deleteElement();

    const newElement = this.getElement();
    replaceDOMElement(container, newElement, oldElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
