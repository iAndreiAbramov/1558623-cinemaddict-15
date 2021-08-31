import dayjs from 'dayjs';
import {getTotalDuration} from '../utils/date';
import {getTopGenre} from '../utils/common';
import AbstractView from './abstract-view';

const getStatsSummaryHTML = (watchedMovies) => {
  const totalHours = dayjs.duration(getTotalDuration(watchedMovies), 'minutes').hours();
  const totalMinutes = dayjs.duration(getTotalDuration(watchedMovies), 'minutes').minutes();
  const topGenre = getTopGenre(watchedMovies);

  return `
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
  `;
};

export default class StatsSummary extends AbstractView  {
  constructor(watchedMovies) {
    super();
    this._watchedMovies = watchedMovies;
  }

  getTemplate() {
    return getStatsSummaryHTML(this._watchedMovies);
  }
}
