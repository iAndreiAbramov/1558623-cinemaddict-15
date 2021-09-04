import ShellPresenter from './presenter/shell-presenter';
import MoviesModel from './model/movies-model';
import Api from './api/api';
import {UpdateType} from './const';

const ENDPOINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic jRp3s4Fv6Hh9Zv77';
const moviesModel = new MoviesModel();
const api = new Api(ENDPOINT, AUTHORIZATION);
const shellPresenter = new ShellPresenter(moviesModel, api);


window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .catch((error) => {
        throw new Error(error);
      });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  shellPresenter.init();
  api.pullMovies()
    .then((movies) => moviesModel.setMovies(UpdateType.INIT, movies))
    .catch(() => moviesModel.setMovies(UpdateType.INIT, []));
});

