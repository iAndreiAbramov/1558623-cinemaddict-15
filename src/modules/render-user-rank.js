import UserRankView from '../view/user-rank';
import {renderDOMElement, Positions} from '../utils/render';

export const renderUserRank = (data) => {
  const userRankContainer = document.querySelector('.header');
  const userRank = new UserRankView(data);
  renderDOMElement(userRankContainer, userRank, Positions.BEFOREEND);
};
