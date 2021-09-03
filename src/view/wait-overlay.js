import AbstractView from './abstract-view';

const getWaitOverlayHTML = () => `
    <div class="wait-overlay">
      <div class="spinner-wrapper">
        <img src="./images/spinner-1s-200px.gif" alt="Load in progress" width="200" height="200">
      </div>
    </div>
  `;

export default class WaitOverlay extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return getWaitOverlayHTML();
  }
}
