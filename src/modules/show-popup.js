import {getFilmPopupHtml} from '../view/film-popup';
import {insertHtmlElement, isEscEvent} from '../services/utils';
import {moviesData} from '../mock-data/film-data';

export const setOpenPopupHandler = () => {
  const cardsContainer = document.querySelector('.films-list__container');
  const popupContainer = document.querySelector('.footer');

  //todo: Реализовать подстановку данных того фильма, на который кликнули
  const filmPopup = getFilmPopupHtml(moviesData[0]);

  cardsContainer.addEventListener('click', (clickEvt) => {
    if (
      clickEvt.target.classList.contains('film-card__poster') ||
      clickEvt.target.classList.contains('film-card__title') ||
      clickEvt.target.classList.contains('film-card__comments')
    ) {
      insertHtmlElement(popupContainer, filmPopup, 'afterend');
      const popup = document.querySelector('.film-details');
      const closeButton = popup.querySelector('.film-details__close-btn');
      const closePopupByEsc = (keyDownEvt) => {
        if (isEscEvent(keyDownEvt)) {
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
    }
  });
};
