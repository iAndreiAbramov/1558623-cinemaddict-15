import {getWatchedMovies} from '../modules/data-filters';
import AbstractView from './abstract-view';

const UserRanks = {
  0: '',
  1: 'Novice',
  11: 'Fan',
  21: 'Movie Buff',
};

const createUserRankHtml = (data) => {
  const watched = getWatchedMovies(data).length;
  let userRank;
  if (watched >= 21) {
    userRank = 21;
  } else if (watched >= 11) {
    userRank = 11;
  } else if (watched > 1) {
    userRank = 1;
  } else {
    userRank = 0;
  }
  return `
    <section class="header__profile profile">
      <p class="profile__rating">${UserRanks[userRank]}</p>
      <img class="profile__avatar" src="./images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};

export default class UserRank extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createUserRankHtml(this._data);
  }
}
