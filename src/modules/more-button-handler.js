import {showMoreCards} from './show-more-cards';

export const setMoreButtonHandler = () => {
  const showMoreButton = document.querySelector('.films-list__show-more');
  if (showMoreButton) {
    showMoreButton.addEventListener('click', showMoreCards);
  }
};
