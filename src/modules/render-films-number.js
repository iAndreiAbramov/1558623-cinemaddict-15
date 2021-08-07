import NumberOfFilms from '../view/number-of-films';
import {insertDOMElement, Positions} from '../services/utils';

export const renderFilmsNumber = (data) => {
  const numberOfFilmsContainer = document.querySelector('.footer__statistics');
  const numberOfFilms = new NumberOfFilms(data).getElement();
  insertDOMElement(numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
};
