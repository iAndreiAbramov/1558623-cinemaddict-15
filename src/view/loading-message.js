import AbstractView from './abstract-view';

const getLoadingHTML = () => `
   <section class="films">
      <section class="films-list">
        <h2 class="films-list__title">Loading...</h2>
      </section>
   </section>
`;

export default class LoadingMessage extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return getLoadingHTML();
  }
}
