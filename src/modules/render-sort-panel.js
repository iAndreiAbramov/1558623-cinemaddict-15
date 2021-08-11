import SortPanel from '../view/sort-panel';
import {renderDOMElement, Positions} from '../utils/render';

export const renderSortPanel = () => {
  const mainContainer = document.querySelector('.main');
  const sortPanel = new SortPanel();
  renderDOMElement(mainContainer, sortPanel, Positions.BEFOREEND);
};
