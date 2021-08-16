import ShellPresenter from './presenter/shell-presenter';

document.addEventListener('DOMContentLoaded', () => {
  const filmsListPresenter = new ShellPresenter();
  filmsListPresenter.init();
});
