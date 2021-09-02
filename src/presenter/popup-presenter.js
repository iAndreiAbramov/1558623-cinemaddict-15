import Popup from '../view/popup';
import PopupControls from '../view/popup-controls';
import CommentItem from '../view/popup-comment';
import {insertDOMElement, Positions, replaceDOMElement} from '../utils/render';
import {getCommentIndexById, isEscEvent} from '../utils/common';
import PopupNewCommentForm from '../view/popup-new-comment-form';
import {UpdateType} from '../const';
import {sortCommentsByDate} from '../utils/sort-data';
import WaitOverlay from '../view/wait-overlay';

const COMMENTS_DELETION_COUNT = 1;

export default class PopupPresenter {
  constructor(movieItem, moviesModel, api) {
    this._moviesModel = moviesModel;
    this._movieItem = movieItem;
    this._api = api;
    this._movieId = this._movieItem.id;
    this._popup = new Popup(this._movieItem);
    this._waitOverlay = new WaitOverlay();
    this._popupDOMElement = this._popup.getElement();
    this._closeButton = this._popupDOMElement.querySelector('.film-details__close-btn');
    this._controlsContainer = this._popupDOMElement.querySelector('.film-details__top-container');
    this._commentsContainer = this._popupDOMElement.querySelector('.film-details__comments-list');
    this._newCommentFormContainer = this._popupDOMElement.querySelector('.film-details__comments-wrap');
    this._commentsNumber = this._popupDOMElement.querySelector('.film-details__comments-count');
    this._comments = [];
    this._newCommentForm = null;
    this._addedComment = null;
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
        this._updateNewCommentForm();
        break;
    }
  }

  _clear() {
    this._disableNewCommentForm();
    this._popupDOMElement.remove();
    this._isOpened = false;
    this._comments = [];
    this._shownComments.clear();
  }

  _show() {
    insertDOMElement(this._container, this._popup, Positions.BEFOREEND);
    this._container.style.overflow = 'hidden';
    this._renderControls();
    this._renderComments();
    this._renderNewCommentForm();
    this._disableNewCommentForm();
    document.addEventListener('keydown', this._handleEscKeydown);
    this._closeButton.addEventListener('click', this._closePopupByClick);
  }

  _getCommentsFromApi() {
    return this._api.pullComments(this._movieId)
      .then((comments) => this._comments = [...comments]);
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
    this._api.putMovie(this._movieId, this._moviesModel.adaptMovieToServer(updatedMovie))
      .then((movie) => this._moviesModel.updateMovie(UpdateType.ALL_LISTS_SOFT, this._moviesModel.adaptMovieToClient(movie)))
      .then((movie) => this._moviesModel.updateMovie(UpdateType.POPUP_CONTROLS, movie))
      .then(() => this._movieItem = updatedMovie);
  }

  _renderComments() {
    insertDOMElement(document.body, this._waitOverlay, Positions.BEFOREEND);
    this._shownComments.forEach((comment) => {
      comment.remove();
    });
    this._shownComments.clear();
    this._getCommentsFromApi()
      .then(() => {
        this._comments = sortCommentsByDate(this._comments);
        this._comments.forEach((commentItem) => {
          const comment = new CommentItem(commentItem);
          comment.setCommentDeleteCallback(this._handleCommentDeletion);
          insertDOMElement(this._commentsContainer, comment, Positions.BEFOREEND);
          this._shownComments.set(commentItem.id, comment);
        });
      })
      .then(() => {
        this._waitOverlay.getElement().remove();
        this._enableNewCommentForm();
      });
  }

  _renderNewCommentForm() {
    this._newCommentForm = new PopupNewCommentForm();
    insertDOMElement(this._newCommentFormContainer, this._newCommentForm, Positions.BEFOREEND);
  }

  _updateNewCommentForm() {
    this._newCommentForm.updateElement().remove();
    this._renderNewCommentForm();
  }

  _handleFormSubmit(evt) {
    if (evt.ctrlKey && evt.key === 'Enter') {
      const update = {};
      if (!this._newCommentForm.state.comment) {
        update.comment = 'I have no words...';
      }
      this._newCommentForm.updateState(update);
      this._handleCommentAddition(this._newCommentForm.state);
    }
  }

  _disableNewCommentForm() {
    document.removeEventListener('keydown', this._handleFormSubmit);
    this._newCommentForm.isDisabled = true;
    this._newCommentForm.updateElement();
  }

  _enableNewCommentForm() {
    document.addEventListener('keydown', this._handleFormSubmit);
    this._newCommentForm.isDisabled = false;
    this._newCommentForm.updateElement();
  }

  _handleCommentAddition(comment) {
    insertDOMElement(document.body, this._waitOverlay, Positions.BEFOREEND);
    this._disableNewCommentForm();
    this._api.postComment(this._movieId, comment)
      .then((response) => {
        this._comments = [...response.comments];
        const updatedMovie = Object.assign(
          {},
          this._moviesModel.adaptMovieToClient(response.movie),
        );
        this._moviesModel.updateMovie(UpdateType.COMMENT, updatedMovie);
        this._movieItem = updatedMovie;
      })
      .then(() => {
        this._addedComment = new CommentItem(this._comments.slice().pop());
        this._addedComment.setCommentDeleteCallback(this._handleCommentDeletion);
        this._shownComments.set(this._addedComment.id, this._addedComment);
        this._commentsNumber.textContent = this._shownComments.size;
        insertDOMElement(this._commentsContainer, this._addedComment, Positions.BEFOREEND);
        this._waitOverlay.getElement().remove();
        this._enableNewCommentForm();
      })
      .catch(() => {
        this._enableNewCommentForm();
        this._waitOverlay.getElement().remove();
      });
  }

  _renderCommentOnDeletion(id) {
    const index = getCommentIndexById(this._comments, id);
    const updatedComment = new CommentItem(this._comments[index], true);
    replaceDOMElement(this._commentsContainer, updatedComment.getElement(), this._shownComments.get(id).getElement());
    this._shownComments.set(id, updatedComment);
  }

  _handleCommentDeletion(id) {
    this._disableNewCommentForm();
    this._renderCommentOnDeletion(id);
    this._api.deleteComment(id)
      .then(() => {
        const updatedMovie = Object.assign({}, this._movieItem);
        const commentIndex = updatedMovie.comments.findIndex((item) => +item.id === +id);
        updatedMovie.comments.splice(commentIndex, COMMENTS_DELETION_COUNT);
        this._moviesModel.updateMovie(UpdateType.COMMENT, updatedMovie);
      })
      .then(() => {
        this._shownComments.get(id).getElement().remove();
        this._shownComments.delete(id);
        this._commentsNumber.textContent = this._shownComments.size;
        this._enableNewCommentForm();
      });
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
