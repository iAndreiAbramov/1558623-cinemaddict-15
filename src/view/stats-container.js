import AbstractView from './abstract-view';

const getStatsHTML = (userRank, filter) => `
    <section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time"
          ${filter === ''  ? 'checked' : ''}>
        <label for="statistic-all-time" class="statistic__filters-label" data-filter="ALL">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today"
          ${filter === 'day'  ? 'checked' : ''}>
        <label for="statistic-today" class="statistic__filters-label" data-filter="TODAY">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week"
          ${filter === 'week'  ? 'checked' : ''}>
        <label for="statistic-week" class="statistic__filters-label" data-filter="WEEK">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month"
          ${filter === 'month'  ? 'checked' : ''}>
        <label for="statistic-month" class="statistic__filters-label" data-filter="MONTH">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year"
          ${filter === 'year'  ? 'checked' : ''}>
        <label for="statistic-year" class="statistic__filters-label" data-filter="YEAR">Year</label>
       </form>
    </section>
  `;

export default class StatsContainer extends AbstractView {
  constructor(userRank, filter) {
    super();
    this._userRank = userRank;
    this._filter = filter;
    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return getStatsHTML(this._userRank, this._filter);
  }

  _filterClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('statistic__filters-label')) {
      this._callback.filterClick(evt);
    }
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._filterClickHandler);
  }
}
