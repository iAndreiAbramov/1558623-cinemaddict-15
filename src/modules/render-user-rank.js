import {insertDOMElement, Positions} from '../services/utils';
import UserRankView from '../view/user-rank';

export const renderUserRank = (data) => {
  const userRankContainer = document.querySelector('.header');
  const userRank = new UserRankView(data).getElement();
  insertDOMElement(userRankContainer, userRank, Positions.BEFOREEND);
};
