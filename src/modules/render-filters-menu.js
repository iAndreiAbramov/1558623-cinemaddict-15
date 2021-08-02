import {getFiltersMenuHtml} from '../view/filters-menu';
import {insertHtmlElement} from '../services/utils';

export const renderFiltersMenu = () => {
  const mainContainer = document.querySelector('.main');
  const filtersMenu = getFiltersMenuHtml();
  insertHtmlElement(mainContainer, filtersMenu, 'afterbegin');
};
