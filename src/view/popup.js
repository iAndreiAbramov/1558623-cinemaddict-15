import {reformatDate} from '../utils/date';
import AbstractView from './abstract-view';

const getPopupHtml = (filmData) => {
  const {id, comments, filmInfo} = filmData;
  const genres = filmInfo.genre.split(' ').length > 1 ? 'Gengres' : 'Genre';
  return `
    <section class="film-details" data-id="${id}">
    <div class="film-details__inner" action="#" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">
            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tbody><tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${reformatDate(filmInfo.release.date,'DD MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmInfo.runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres}</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${filmInfo.genre}</span>
              </tr>
            </tbody></table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list"></ul>
        </section>
      </div>
    </div>
  </section>
  `;
};

export default class Popup extends AbstractView {
  constructor(filmData) {
    super();
    this._filmData = filmData;
  }

  getTemplate() {
    return getPopupHtml(this._filmData);
  }
}
