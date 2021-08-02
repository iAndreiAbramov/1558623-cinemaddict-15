import {getSortPanelHtml} from '../view/sort-panel';
import {insertHtmlElement} from '../services/utils';

export const renderSortPanel = () => {
  const mainContainer = document.querySelector('.main');
  const sortPanel = getSortPanelHtml();
  insertHtmlElement(mainContainer, sortPanel, 'beforeend');
};
