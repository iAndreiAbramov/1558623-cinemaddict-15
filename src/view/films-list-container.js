import AbstractView from './abstract-view';

const getFilmsListContainer = () => `
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>
`;

export default class FilmsListContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return getFilmsListContainer();
  }
}
