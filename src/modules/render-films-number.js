import {getNumberOfFilmsHtml} from '../view/number-of-films';
import {insertHtmlElement} from '../services/utils';

export const renderFilmsNumber = () => {
  const numberOfFilmsContainer = document.querySelector('.footer__statistics');
  const numberOfFilms = getNumberOfFilmsHtml();
  insertHtmlElement(numberOfFilmsContainer, numberOfFilms, 'beforeend');
};
