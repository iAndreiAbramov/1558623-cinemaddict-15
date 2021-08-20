import SmartView from './smart';

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

export default class PopupNewComment extends SmartView  {
  constructor() {
    super();
    this._state = {
      emojiSrc: '',
      comment: '',
    };

    this._emojiToggleHandler = this._emojiToggleHandler.bind(this);
    this._textAreaBlurHandler = this._textAreaBlurHandler.bind(this);
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
      .addEventListener('click', this._emojiToggleHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _emojiToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emojiSrc: evt.target.getAttribute('src'),
    });
    this.updateElement();
  }

  _textAreaBlurHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value,
    });
    this.updateElement();
  }

  _formSubmitHandler() {

  }
}
