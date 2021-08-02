import {getUserRankHtml} from '../view/user-rank';
import {insertHtmlElement} from '../services/utils';

export const renderUserRank = () => {
  const userRankContainer = document.querySelector('.header');
  const userRank = getUserRankHtml();
  insertHtmlElement(userRankContainer, userRank, 'beforeend');
};
