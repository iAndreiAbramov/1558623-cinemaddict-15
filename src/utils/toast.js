const SHOW_TIME = 5000;

export const toast = (message = '') => {
  const oldMessage = document.querySelector('.toast-message');
  if (oldMessage) {
    oldMessage.remove();
  }

  const toastMessage = document.createElement('div');
  toastMessage.classList.add('toast-message');
  toastMessage.textContent = message;

  document.body.appendChild(toastMessage);

  setTimeout(() => {
    toastMessage.remove();
  }, SHOW_TIME);
};
