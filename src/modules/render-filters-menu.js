import FiltersMenu from '../view/filters-menu';
import {renderDOMElement, Positions} from '../utils/render';

export const renderFiltersMenu = (data) => {
  const mainContainer = document.querySelector('.main');
  const filtersMenu = new FiltersMenu(data);
  renderDOMElement(mainContainer, filtersMenu, Positions.AFTERBEGIN);
};
