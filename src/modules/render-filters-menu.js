import FiltersMenu from '../view/filters-menu';
import {insertDOMElement, Positions} from '../services/utils';

export const renderFiltersMenu = (data) => {
  const mainContainer = document.querySelector('.main');
  const filtersMenu = new FiltersMenu(data).getElement();
  insertDOMElement(mainContainer, filtersMenu, Positions.AFTERBEGIN);
};
