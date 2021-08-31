import AbstractView from './abstract-view';
import {BAR_HEIGHT} from '../const';
import {getGenresList} from '../utils/common';
import {Chart} from 'chart.js';

const getChartHTML = () => `
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  `;

export default class ChartView extends AbstractView {
  constructor(watchedMovies, chartOptions) {
    super();
    this._watchedMovies = watchedMovies;
    this._genres = new Map(Object.entries(getGenresList(this._watchedMovies)).sort((a, b) => b[1] - a[1]));
    this._statisticCtx = this.getElement().querySelector('.statistic__chart');
    this._statisticCtx.height = BAR_HEIGHT * this._genres.size;
    this._chartOptions = chartOptions;
    this._chartOptions.data.labels = Array.from(this._genres.keys());
    this._chartOptions.data.datasets[0].data = Array.from(this._genres.values());
  }

  getTemplate() {
    return getChartHTML();
  }

  render() {
    return new Chart(this._statisticCtx, this._chartOptions);
  }
}
