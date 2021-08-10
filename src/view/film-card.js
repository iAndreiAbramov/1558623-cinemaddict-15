import {getShortDescription, reformatDate} from '../services/utils';
import AbstractView from './abstract-view';

const MAX_DESCRIPTION_LENGTH = 140;

const getFilmCardHtml = (filmData) => {
  const {comments, filmInfo, userDetails} = filmData;
  return `
    <article class="film-card">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${reformatDate(filmInfo.release.date, 'YYYY').slice(-4)}</span>
        <span class="film-card__duration">${filmInfo.runtime}</span>
        <span class="film-card__genre">${filmInfo.genre}</span>
      </p>
      <img src="${filmInfo.poster}" alt="" class="film-card__poster" width="230" height="340">
      <p class="film-card__description">${getShortDescription(filmInfo.description, MAX_DESCRIPTION_LENGTH)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button
          class="
            film-card__controls-item
            film-card__controls-item--add-to-watchlist
            ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}
          "
          type="button">Add to watchlist</button>
        <button
          class="
            film-card__controls-item
            film-card__controls-item--mark-as-watched
            ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}
          "
          type="button">Mark as watched</button>
        <button
          class="
            film-card__controls-item
            film-card__controls-item--favorite
            ${userDetails.favorite ? 'film-card__controls-item--active' : ''}
          "
         type="button">Mark as favorite</button>
      </div>
    </article>
  `;
};

export default class FilmCard extends AbstractView {
  constructor(filmData) {
    super();
    this._filmData = filmData;
  }

  getTemplate() {
    return getFilmCardHtml(this._filmData);
  }
}
