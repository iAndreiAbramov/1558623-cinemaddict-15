import SortPanel from '../view/sort-panel';
import {insertDOMElement, Positions} from '../services/utils';

export const renderSortPanel = () => {
  const mainContainer = document.querySelector('.main');
  const sortPanel = new SortPanel().getElement();
  insertDOMElement(mainContainer, sortPanel, Positions.BEFOREEND);
};
