import {getDurationFromMinutes, formatDate} from '../utils/date';
import AbstractView from './abstract-view';
import {getShortDescription} from '../utils/common';

const MAX_DESCRIPTION_LENGTH = 140;

const getFilmCardHtml = (filmData) => {
  const {id, comments, filmInfo, userDetails} = filmData;
  const releaseYear = formatDate(filmInfo.release.date, 'YYYY').slice(-4) || '';
  const runtime = getDurationFromMinutes(filmInfo.runtime) || '';
  const genres = filmInfo.genre ? filmInfo.genre.join(', ') : 'NO DATA';
  return `
    <article class="film-card" data-id="${id}">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="${filmInfo.poster}" alt="" class="film-card__poster" width="230" height="340">
      <p class="film-card__description">${getShortDescription(filmInfo.description, MAX_DESCRIPTION_LENGTH)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button" data-details="watchlist">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button" data-details="alreadyWatched">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button" data-details="favorite">Mark as favorite</button>
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
