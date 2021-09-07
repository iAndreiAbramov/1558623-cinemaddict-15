import {formatDateForComments} from '../utils/date';
import AbstractView from './abstract-view';
import {EmotionsImages} from '../const';

const getCommentItemHtml = (commentDataItem, isDeleting, isOnline) => {
  const {author, comment, date, emotion} = commentDataItem;
  const relativeDate = formatDateForComments(date);
  const deletingText = isDeleting ? 'Deleting' : 'Delete';
  const disabled = isDeleting ? 'disabled' : '';
  const shake = isOnline ? 'film-details__comment' : 'film-details__comment shake';
  return `
    <li class="${shake}">
      <span class="film-details__comment-emoji">
        <img src="${EmotionsImages[emotion]}" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${relativeDate}</span>
          <button class="film-details__comment-delete" ${disabled}>${deletingText}</button>
        </p>
      </div>
    </li>
  `;
};

export default class CommentItem extends AbstractView {
  constructor(commentDataItem, isDeleting = false, isOnline = true) {
    super();
    this._commentDataItem = commentDataItem;
    this._isOnline  = isOnline;
    this._isDeleting = isDeleting;
    this._commentDeleteCallback = this._commentDeleteCallback.bind(this);
  }

  getTemplate() {
    return getCommentItemHtml(this._commentDataItem, this._isDeleting, this._isOnline);
  }

  get id() {
    return this._commentDataItem.id;
  }

  _commentDeleteCallback(evt) {
    evt.preventDefault();
    this._callback.commentDelete(this._commentDataItem.id);
  }

  setCommentDeleteCallback(callback) {
    this._callback.commentDelete = callback;
    this
      .getElement()
      .querySelector('.film-details__comment-delete')
      .addEventListener('click', this._commentDeleteCallback);
  }
}
