import Popup from '../view/popup';
import PopupControls from '../view/popup-controls';
import CommentItem from '../view/popup-comment';
import {insertDOMElement, Positions, replaceDOMElement} from '../utils/render';
import {isEscEvent} from '../utils/common';
import PopupNewCommentAdder from '../view/popup-new-comment-adder';
import {UpdateType} from '../const';

export default class PopupPresenter {
  constructor(movieItem, moviesModel) {
    this._moviesModel = moviesModel;
    this._movieItem = movieItem;
    this._popup = new Popup(this._movieItem);
    this._popupDOMElement = this._popup.getElement();
    this._closeButton = this._popupDOMElement.querySelector('.film-details__close-btn');
    this._controlsContainer = this._popupDOMElement.querySelector('.film-details__top-container');
    this._commentsContainer = this._popupDOMElement.querySelector('.film-details__comments-list');
    this._newCommentAdder = new PopupNewCommentAdder();
    this._container = document.body;
    this._comments = this._movieItem.comments;
    this._id = this._movieItem.id;
    this._isOpened = false;
    this._closeEvent = new CustomEvent(
      'popupClose', {
        bubbles: true,
        detail: {id: this._id},
      });

    this._closePopupByClick = this._closePopupByClick.bind(this);
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
    this._updateControls = this._updateControls.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  get isOpened() {
    return this._isOpened;
  }

  init() {
    this._show();
    this._isOpened = true;
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case 'POPUP_CONTROLS':
        this._renderControls();
        break;
    }
  }

  _clear() {
    this._popupDOMElement.remove();
    this._isOpened = false;
  }

  _show() {
    insertDOMElement(this._container, this._popup, Positions.BEFOREEND);
    this._container.style.overflow = 'hidden';
    this._renderControls();
    this._renderComments();
    this._renderNewCommentAdder();
    document.addEventListener('keydown', this._closePopupByEsc);
    this._closeButton.addEventListener('click', this._closePopupByClick);
  }

  _renderControls() {
    const newControls = new PopupControls(this._movieItem);
    newControls.setClickHandler(this._updateControls);
    const oldControls = this._controlsContainer.querySelector('.film-details__controls');
    if (oldControls) {
      replaceDOMElement(this._controlsContainer, newControls, oldControls);
    } else {
      insertDOMElement(this._controlsContainer, newControls, Positions.BEFOREEND);
    }
  }

  _updateControls(evt) {
    const option = evt.target.getAttribute('id');
    this._moviesModel.updateMovie(
      UpdateType.POPUP_CONTROLS,
      {id: this._id, option},
    );
  }

  _renderComments() {
    // console.log(this._comments);
    this._comments.forEach((commentItem) => {
      const comment = new CommentItem(commentItem);
      insertDOMElement(this._commentsContainer, comment, Positions.BEFOREEND);
    });
  }

  _renderNewCommentAdder() {
    this._newCommentAdder.setFormSubmitHandler(this._handleCommentAddition);
    insertDOMElement(this._commentsContainer, this._newCommentAdder, Positions.AFTEREND);
  }

  _handleCommentAddition(comment) {
    this._comments.push(comment);
    this._moviesModel.updateMovie({id: this._id, comments: this._comments});
    this._renderComments();
  }

  _handleCommentDeletion() {

  }

  _closePopupByEsc(keyDownEvt) {
    if (isEscEvent(keyDownEvt)) {
      this._closePopup();
    }
  }

  _closePopupByClick() {
    this._closePopup();
  }

  _closePopup() {
    this._clear();
    document.removeEventListener('keydown', this._closePopupByEsc);
    document.body.style.overflow = '';
    document.dispatchEvent(this._closeEvent);
  }
}
