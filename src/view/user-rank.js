import AbstractView from './abstract-view';
import {UserRankGrades} from '../const';

const createUserRankHtml = (rank) => `
    <section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="./images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;

export default class UserRank extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createUserRankHtml(this.rank);
  }

  get rank() {
    const UserRanks = {
      NO_RANK: '',
      NOVICE: 'Novice',
      FAN: 'Fan',
      MOVIE_BUFF: 'Movie Buff',
    };

    const watched = this._data.length;
    let userRank;
    if (watched >= UserRankGrades.MOVIE_BUFF) {
      userRank = UserRanks.MOVIE_BUFF;
    } else if (watched >= UserRankGrades.FAN) {
      userRank = UserRanks.FAN;
    } else if (watched >= UserRankGrades.NOVICE) {
      userRank = UserRanks.NOVICE;
    } else {
      userRank = UserRanks.NO_RANK;
    }
    return userRank;
  }
}
