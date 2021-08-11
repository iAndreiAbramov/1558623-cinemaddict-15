import NumberOfFilms from '../view/number-of-films';
import {renderDOMElement, Positions} from '../utils/render';

export const renderFilmsNumber = (data) => {
  const numberOfFilmsContainer = document.querySelector('.footer__statistics');
  const numberOfFilms = new NumberOfFilms(data);
  renderDOMElement(numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
};
