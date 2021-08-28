import Popup from '../view/popup';
import PopupControls from '../view/popup-controls';
import CommentItem from '../view/popup-comment';
import {insertDOMElement, Positions, replaceDOMElement} from '../utils/render';
import {getRandomInteger, isEscEvent} from '../utils/common';
import PopupNewCommentForm from '../view/popup-new-comment-form';
import {UpdateType} from '../const';

const COMMENTS_DELETION_COUNT = 1;

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
    this._commentsNumber = this._popupDOMElement.querySelector('.film-details__comments-count');
    this._comments = this._movieItem.comments;
    this._newCommentForm = null;
    this._container = document.body;
    this._isOpened = false;
    this._shownComments = new Map();

    this._closePopupByClick = this._closePopupByClick.bind(this);
    this._handleEscKeydown = this._handleEscKeydown.bind(this);
    this._handleCategoryToggle = this._handleCategoryToggle.bind(this);
    this._handleCommentAddition = this._handleCommentAddition.bind(this);
    this._handleCommentDeletion = this._handleCommentDeletion.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

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
        this._comments = this._getCommentsFromModel();
        this._renderComments();
        this._updateNewCommentForm();
    }
  }

  _clear() {
    this._popupDOMElement.remove();
    this._isOpened = false;
    this._comments = [];
    this._shownComments.clear();
    document.removeEventListener('keydown', this._handleFormSubmit);
  }

  _show() {
    insertDOMElement(this._container, this._popup, Positions.BEFOREEND);
    this._container.style.overflow = 'hidden';
    this._renderControls();
    this._renderComments();
    this._renderNewComment();
    document.addEventListener('keydown', this._handleEscKeydown);
    this._closeButton.addEventListener('click', this._closePopupByClick);
    document.addEventListener('keydown', this._handleFormSubmit);
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
    this._movieItem = updatedMovie;
  }

  _renderComments() {
    this._shownComments.forEach((comment) => {
      comment.remove();
    });
    this._shownComments.clear();
    this._comments = this._getCommentsFromModel();
    this._commentsNumber.textContent = this._comments.length;
    this._comments.forEach((commentItem) => {
      const comment = new CommentItem(commentItem);
      comment.setCommentDeleteCallback(this._handleCommentDeletion);
      insertDOMElement(this._commentsContainer, comment, Positions.BEFOREEND);
      this._shownComments.set(commentItem.id, comment.getElement());
    });
  }

  _renderNewComment() {
    this._newCommentForm = new PopupNewCommentForm();
    insertDOMElement(this._commentsContainer, this._newCommentForm, Positions.AFTEREND);
  }

  _updateNewCommentForm() {
    this._newCommentForm.updateElement().remove();
    this._renderNewComment();
  }

  _handleFormSubmit(evt) {
    if (evt.ctrlKey && evt.key === 'Enter') {
      const update = {
        date: new Date(),
      };
      if (!this._newCommentForm.state.id) {
        update.id = getRandomInteger(10000, 10000000);
      }
      if (!this._newCommentForm.state.comment) {
        update.comment = 'I have no words...';
      }
      this._newCommentForm.updateState(update);
      this._handleCommentAddition(this._newCommentForm.state);
    }
  }

  _handleCommentAddition(comment) {
    const updatedMovie = Object.assign({}, this._movieItem);
    updatedMovie.comments.push(comment);
    this._moviesModel.updateMovie(UpdateType.COMMENT, updatedMovie);
    this._movieItem = updatedMovie;
  }

  _handleCommentDeletion(id) {
    const updatedMovie = Object.assign({}, this._movieItem);
    const index = updatedMovie.comments.findIndex((item) => +item.id === +id);
    updatedMovie.comments.splice(index, COMMENTS_DELETION_COUNT);
    this._moviesModel.updateMovie(UpdateType.COMMENT, updatedMovie);
  }

  _handleEscKeydown(keyDownEvt) {
    if (isEscEvent(keyDownEvt)) {
      this._closePopup();
    }
  }

  _closePopupByClick() {
    this._closePopup();
  }

  _closePopup() {
    this._clear();
    document.removeEventListener('keydown', this._handleEscKeydown);
    document.body.style.overflow = '';
  }
}
