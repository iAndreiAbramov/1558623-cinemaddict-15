import ShellPresenter from './presenter/shell-presenter';
import {getAllMovies} from './modules/data-filters';

document.addEventListener('DOMContentLoaded', () => {
  const shellPresenter = new ShellPresenter(getAllMovies());
  shellPresenter.init();
});
