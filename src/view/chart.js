import AbstractView from './abstract-view';
import {BAR_HEIGHT} from '../const';
import {getGenresList} from '../utils/common';
import {Chart} from 'chart.js';
import {ChartOptions} from '../const';

const getChartHTML = () => {
  return `
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  `;
};

export default class ChartView extends AbstractView {
  constructor(watchedMovies) {
    super();
    this._watchedMovies = watchedMovies;
    this._genres = getGenresList(this._watchedMovies);
    this._statisticCtx = this.getElement().querySelector('.statistic__chart');
    this._statisticCtx.height = BAR_HEIGHT * Object.entries(this._genres).length;
  }

  getTemplate() {
    return getChartHTML();
  }

  render() {
    return new Chart(this._statisticCtx, ChartOptions);
  }
}
