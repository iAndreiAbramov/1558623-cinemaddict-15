import {renderFilmsList} from './render-films-list';

export const setMoreButtonHandler = () => {
  const showMoreButton = document.querySelector('.films-list__show-more');
  if (showMoreButton) {
    showMoreButton.addEventListener('click', renderFilmsList);
  }
};
