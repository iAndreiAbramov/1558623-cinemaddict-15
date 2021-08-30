import ShellPresenter from './presenter/shell-presenter';
import {getAllMovies} from './utils/data-filters';
import Movies from './model/movies';

document.addEventListener('DOMContentLoaded', () => {
  const movies = getAllMovies();

  const moviesModel = new Movies();
  moviesModel.setMovies(movies);

  const shellPresenter = new ShellPresenter(moviesModel);
  shellPresenter.init();
});
