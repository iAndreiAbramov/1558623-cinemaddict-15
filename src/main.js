import ShellPresenter from './presenter/shell-presenter';
import MoviesModel from './model/movies-model';
import Api from './api';
import {UpdateType} from './const';

const ENDPOINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic jRp3s4Fv6Hh9Zv77';
const moviesModel = new MoviesModel();
const shellPresenter = new ShellPresenter(moviesModel);

document.addEventListener('DOMContentLoaded', () => {
  shellPresenter.init();
  const api = new Api(ENDPOINT, AUTHORIZATION);
  api.pullMovies()
    .then((movies) => moviesModel.setMovies(UpdateType.INIT, movies))
    .catch(() => moviesModel.setMovies(UpdateType.INIT, []));
});
