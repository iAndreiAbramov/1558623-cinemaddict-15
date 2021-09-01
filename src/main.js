import ShellPresenter from './presenter/shell-presenter';
import {getAllMovies} from './utils/data-filters';
import Movies from './model/movies';
import Api from './api';

const ENDPOINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic jRp3s4Fv6Hh9Zv77';

document.addEventListener('DOMContentLoaded', () => {
  // const movies = getAllMovies();
  // console.log(movies[0]);

  const api = new Api(ENDPOINT, AUTHORIZATION);
  api.pullMovies().then((movies) => {
    // console.log(movies);
    // console.log(movies[0]);
    const moviesModel = new Movies();
    moviesModel.setMovies(movies);
    // console.log(moviesModel.getMovies()[0]);

    const shellPresenter = new ShellPresenter(moviesModel);
    shellPresenter.init();
  });
});
