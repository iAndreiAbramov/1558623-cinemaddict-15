import FilmsListPresenter from './presenter/films-list-presenter';

document.addEventListener('DOMContentLoaded', () => {
  const filmsListPresenter = new FilmsListPresenter();
  filmsListPresenter.init();
});
