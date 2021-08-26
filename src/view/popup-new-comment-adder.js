import SmartView from './smart';
import {formatDateForComments} from '../utils/date';

const getPopupNewCommentHtml = (state) => {
  const {emojiSrc, comment} = state;
  return `
    <form class="film-details__new-comment" action="#" method="POST">
       <div class="film-details__add-emoji-label">
        ${emojiSrc ? `<img src=${emojiSrc} width="68" height="68" alt="emoji preview">` : ''}
       </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
    </form>
  `;
};

export default class PopupNewCommentAdder extends SmartView {
  constructor() {
    super();
    this._state = {
      id: 0,
      author: 'You',
      emotion: '',
      comment: '',
      date: formatDateForComments(new Date()),
    };

    this._emotionToggleHandler = this._emotionToggleHandler.bind(this);
    this._textAreaBlurHandler = this._textAreaBlurHandler.bind(this);
    this._textAreaKeydownHandler = this._textAreaKeydownHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return getPopupNewCommentHtml(this._state);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('blur', this._textAreaBlurHandler);
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._emotionToggleHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('keydown', this._textAreaKeydownHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _emotionToggleHandler(evt) {
    evt.preventDefault();
    this._state.emotion = evt.target.getAttribute('src');
    this.updateData({
      emojiSrc: this._state.emotion,
    });
    this.updateElement();
  }

  _textAreaBlurHandler(evt) {
    this._state.comment = evt.target.value;
    this.updateData({
      comment: this._state.comment,
    });
    this.updateElement();
  }

  _textAreaKeydownHandler(evt) {
    this.updateData({
      comment: evt.target.value,
    });
  }

  _formSubmitHandler(evt) {
    if (evt.ctrlKey && evt.key === 'Enter') {
      this._callback.formSubmit(this._state);
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    document.addEventListener('keydown', this._formSubmitHandler);
  }
}
