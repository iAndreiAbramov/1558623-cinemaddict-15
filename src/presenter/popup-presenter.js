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
    this._id = this._movieItem.id;
    this._popup = new Popup(this._movieItem);
    this._popupDOMElement = this._popup.getElement();
    this._closeButton = this._popupDOMElement.querySelector('.film-details__close-btn');
    this._controlsContainer = this._popupDOMElement.querySelector('.film-details__top-container');
    this._commentsContainer = this._popupDOMElement.querySelector('.film-details__comments-list');
    this._newCommentAdder = new PopupNewCommentAdder();
    this._comments = this._movieItem.comments;
    this._container = document.body;
    this._isOpened = false;
    this._shownComments = new Map();

    this._closePopupByClick = this._closePopupByClick.bind(this);
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
    this._handleCategoryToggle = this._handleCategoryToggle.bind(this);
    this._handleCommentAddition = this._handleCommentAddition.bind(this);
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
      case UpdateType.POPUP_CONTROLS:
        this._renderControls();
        break;
      case UpdateType.COMMENT:
        console.log(this._comments);
        this._comments = this._getCommentsFromModel();
        console.log(this._comments);
        this._renderComments();
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

  _getCommentsFromModel() {
    return this._moviesModel.getComments(this._id);
  }

  _renderControls() {
    const newControls = new PopupControls(this._movieItem);
    newControls.setClickHandler(this._handleCategoryToggle);
    const oldControls = this._controlsContainer.querySelector('.film-details__controls');
    if (oldControls) {
      replaceDOMElement(this._controlsContainer, newControls, oldControls);
    } else {
      insertDOMElement(this._controlsContainer, newControls, Positions.BEFOREEND);
    }
  }

  _handleCategoryToggle(evt) {
    const option = evt.target.getAttribute('id');
    const updatedMovie = Object.assign(
      {},
      this._movieItem,
    );
    updatedMovie.userDetails[option] = !updatedMovie.userDetails[option];
    this._moviesModel.updateMovie(UpdateType.POPUP_CONTROLS, updatedMovie);
    this._moviesModel.updateMovie(UpdateType.ALL_LISTS_SOFT);
  }

  _renderComments() {
    this._shownComments.forEach((comment) => {
      comment.remove();
    });
    this._comments.forEach((commentItem) => {
      const comment = new CommentItem(commentItem);
      insertDOMElement(this._commentsContainer, comment, Positions.BEFOREEND);
      this._shownComments.set(commentItem.id, comment.getElement());
    });
  }

  _renderNewCommentAdder() {
    this._newCommentAdder.setFormSubmitHandler(this._handleCommentAddition);
    insertDOMElement(this._commentsContainer, this._newCommentAdder, Positions.AFTEREND);
  }

  _handleCommentAddition(comment) {
    const updatedMovie = Object.assign({}, this._movieItem);
    updatedMovie.comments.push(comment);
    this._moviesModel.updateMovie(UpdateType.COMMENT, updatedMovie);
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
  }
}
