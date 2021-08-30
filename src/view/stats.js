import AbstractView from './abstract-view';
import dayjs from 'dayjs';
import {getTotalDuration} from '../utils/date';
import {getTopGenre} from '../utils/common';


const getStatsHTML = (watchedMovies, userRank) => {
  const totalHours = dayjs.duration(getTotalDuration(watchedMovies), 'minutes').hours();
  const totalMinutes = dayjs.duration(getTotalDuration(watchedMovies), 'minutes').minutes();
  const topGenre = getTopGenre(watchedMovies);
  return `
    <section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
       </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-dataItem">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedMovies.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-dataItem">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalHours} <span class="statistic__item-description">h</span> ${totalMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        ${topGenre ? `<li class="statistic__text-dataItem">
                        <h4 class="statistic__item-title">Top genre</h4>
                        <p class="statistic__item-text">${topGenre}</p>
                      </li>` : ''}
      </ul>



    </section>
`;
};

export default class Stats extends AbstractView {
  constructor(watchedMovies, userRank) {
    super();
    this._watchedMovies = watchedMovies;
    this._userRank = userRank;
  }

  getTemplate() {
    return getStatsHTML(this._watchedMovies, this._userRank);
  }
}
