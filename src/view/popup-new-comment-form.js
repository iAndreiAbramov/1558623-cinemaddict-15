import * as he from 'he';
import SmartView from './smart';
import {EmotionsImages} from '../const';

const getPopupNewCommentHtml = (state, isDisabled, isRejected) => {
  const {emotion, comment} = state;
  const disabled = isDisabled ? 'disabled' : '';
  const rejected = isRejected ? 'shake' : '';
  return `
    <form class="film-details__new-comment ${rejected}" action="#">
       <div class="film-details__add-emoji-label">
        ${emotion ? `<img src=${EmotionsImages[emotion]} width="68" height="68" alt="emoji preview">` : ''}
       </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${disabled}>${comment}</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${disabled}>
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emotion="smile">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${disabled}>
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emotion="sleeping">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${disabled}>
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emotion="puke">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${disabled}>
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emotion="angry">
          </label>
        </div>
    </form>
  `;
};

export default class PopupNewCommentForm extends SmartView {
  constructor() {
    super();
    this._isDisabled = false;
    this._isRejected = false;
    this.resetState();
    this._emotionToggleHandler = this._emotionToggleHandler.bind(this);
    this._textAreaInputHandler = this._textAreaInputHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return getPopupNewCommentHtml(this._state, this._isDisabled, this._isRejected);
  }

  get isDisabled() {
    return this._isDisabled;
  }

  set isDisabled(value) {
    this._isDisabled = value;
  }

  get isRejected() {
    return this._isRejected;
  }

  set isRejected(value) {
    this._isRejected = value;
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._emotionToggleHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._textAreaInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _emotionToggleHandler(evt) {
    if (evt.target.value) {
      this.updateState({
        emotion: evt.target.value,
      });
      this.updateElement();
    }
  }

  _textAreaInputHandler(evt) {
    this.updateState({
      comment: he.encode(evt.target.value),
    });
  }
}
