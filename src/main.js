import ShellPresenter from './presenter/shell-presenter';
import MoviesModel from './model/movies-model';
import Api from './api/api';
import {NetworkMessages, UpdateType} from './const';
import {toast} from './utils/toast';
import Provider from './api/provider';
import Store from './api/store';

const ENDPOINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic jRp3s4Fv6Hh9Zv77';
const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v1';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const moviesModel = new MoviesModel();
const api = new Api(ENDPOINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const shellPresenter = new ShellPresenter(moviesModel, apiWithProvider);

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
  apiWithProvider.pullMovies()
    .then((movies) => movies.map(MoviesModel.adaptMovieToClient))
    .then((movies) => moviesModel.setMovies(UpdateType.INIT, movies))
    .catch(() => moviesModel.setMovies(UpdateType.INIT, []));
});

window.addEventListener('offline', () => {
  document.title = document.title += ' [offline]';
  toast(NetworkMessages.DISCONNECT);
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  toast(NetworkMessages.CONNECT);
  apiWithProvider.sync();
});
