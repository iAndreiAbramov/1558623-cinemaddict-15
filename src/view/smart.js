import AbstractView from './abstract-view';
import {replaceDOMElement} from '../utils/render';

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._state = {};
  }

  get state() {
    return this._state;
  }

  updateState(update) {
    if (!update) {
      return;
    }
    this._state = Object.assign(
      {},
      this._state,
      update,
    );
  }

  resetState() {
    const update = {
      id: 0,
      author: 'You',
      emotion: 'smile',
      comment: '',
      date: '',
    };
    this.updateState(update);
  }

  updateElement() {
    const oldElement = this.getElement();
    const container = oldElement.parentElement;
    this.deleteElement();

    this.restoreHandlers();
    const newElement = this.getElement();
    replaceDOMElement(container, newElement, oldElement);
    return newElement;
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
