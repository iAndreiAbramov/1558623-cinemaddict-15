import AbstractView from './abstract-view';

const getListsContainerHtml = () => `
    <section class="films"></section>
`;

export default class ListsContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return getListsContainerHtml();
  }
}
