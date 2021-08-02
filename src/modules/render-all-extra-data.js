import {renderExtraData} from './render-extra-data';
import {sortByCommentsNumber, sortByRating} from './data-sort';
import {moviesData} from '../mock-data/movies-data';

export const renderAllExtraData = () => {
  const topRatedContainer = document.querySelectorAll('.films-list__container')[1];
  const mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];
  renderExtraData(topRatedContainer, sortByRating(moviesData));
  renderExtraData(mostCommentedContainer, sortByCommentsNumber(moviesData));
};
