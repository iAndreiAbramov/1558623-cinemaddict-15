import ChartDataLabels from 'chartjs-plugin-datalabels';

export const UserRankGrades = {
  NO_RANK: 0,
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 21,
};

export const UpdateType = {
  ALL_LISTS_SOFT: 'ALL_LISTS_SOFT',
  POPUP_CONTROLS: 'POPUP_CONTROLS',
  COMMENT: 'COMMENT',
};

export const Filters = {
  ALL: '',
  WATCHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITE: 'favorite',
  STATS: 'stats',
};

export const SortOptions = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const Screens = {
  FILMS: 'films',
  STATS: 'stats',
};

//Chart
export const BAR_HEIGHT = 50;
export const ChartOptions = {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: ['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series'],
    datasets: [{
      data: [11, 8, 7, 4, 3],
      backgroundColor: '#ffe800',
      hoverBackgroundColor: '#ffe800',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 20,
        },
        color: '#ffffff',
        anchor: 'start',
        align: 'start',
        offset: 40,
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#ffffff',
          padding: 100,
          fontSize: 20,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 24,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
};
