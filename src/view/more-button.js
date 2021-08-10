import AbstractView from './abstract-view';

const getMoreHtml = () => `
  <button class="films-list__show-more">Show more</button>
`;

export default class MoreButton extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return getMoreHtml();
  }
}
