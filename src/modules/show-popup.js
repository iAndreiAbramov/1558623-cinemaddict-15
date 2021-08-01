import {getFilmPopupHtml} from '../view/film-popup';
import {insertHtmlElement} from '../services/utils';
import {moviesData} from '../mock-data/film-data';
import {isEscEvent} from '../services/utils';

export const setOpenPopupHandler = () => {
  const cardsContainer = document.querySelector('.films-list__container');
  const popupContainer = document.querySelector('.footer');

  //todo: Реализовать подстановку данных того фильма, на который кликнули
  const filmPopup = getFilmPopupHtml(moviesData[0]);

  cardsContainer.addEventListener('click', (evt) => {
    insertHtmlElement(popupContainer, filmPopup, 'afterend');
    const popup = document.querySelector('.film-details');
    const closeButton = popup.querySelector('.film-details__close-btn');
    const closePopupByEsc = (evt) => {
      if (isEscEvent(evt)) {
        popup.remove();
        document.removeEventListener('keydown', closePopupByEsc);
      }
    };
    const closePopupByClick = () => {
      popup.remove();
      document.removeEventListener('keydown', closePopupByEsc);
    };

    document.addEventListener('keydown', closePopupByEsc);
    closeButton.addEventListener('click', closePopupByClick);
  });
};
