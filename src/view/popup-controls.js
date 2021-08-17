import AbstractView from './abstract-view';

const getPopupControlsHTML = (filmData) => {
  const {userDetails} = filmData;
  return `
       <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist
              ${userDetails.watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''}" id="alreadyWatched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${userDetails.favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
        </section>
  `;
};

export default class PopupControls extends AbstractView {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._clickCallback = this._clickCallback.bind(this);
  }

  getTemplate() {
    return getPopupControlsHTML(this._filmData);
  }

  _clickCallback(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickCallback);
  }
}
