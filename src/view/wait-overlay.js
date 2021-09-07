import AbstractView from './abstract-view';

const getWaitOverlayHTML = () => `
    <div class="wait-overlay">
      <div class="spinner-wrapper"></div>
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
