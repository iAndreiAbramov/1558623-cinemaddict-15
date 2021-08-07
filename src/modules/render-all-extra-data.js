import {renderExtraData} from './render-extra-data';
import {sortByCommentsNumber, sortByRating} from './data-sort';

export const renderAllExtraData = (data) => {
  const topRatedContainer = document.querySelectorAll('.films-list__container')[1];
  const mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];
  renderExtraData(topRatedContainer, sortByRating(data));
  renderExtraData(mostCommentedContainer, sortByCommentsNumber(data));
};
