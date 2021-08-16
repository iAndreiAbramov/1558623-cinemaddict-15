import ShellPresenter from './presenter/shell-presenter';

document.addEventListener('DOMContentLoaded', () => {
  const shellPresenter = new ShellPresenter();
  shellPresenter.init();
});
