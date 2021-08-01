import {getWatchedMovies} from '../modules/data-filters';
import {moviesData} from '../mock-data/movies-data';

const UserRanks = {
  0: '',
  1: 'Novice',
  11: 'Fan',
  21: 'Movie Buff',
};

const watched = getWatchedMovies(moviesData).length;
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

export const getUserRankHtml = () => `
    <section class="header__profile profile">
      <p class="profile__rating">${UserRanks[userRank]}</p>
      <img class="profile__avatar" src="./images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
