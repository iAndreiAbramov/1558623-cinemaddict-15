import {getRandomInteger, insertDOMElement, isEscEvent, Positions} from '../services/utils';
import {moviesData} from '../mock-data/movies-data';
import CommentItem from '../view/popup-comment';
import FilmPopup from '../view/film-popup';

export const setOpenPopupHandler = () => {
  const cardsContainers = document.querySelectorAll('.films-list__container');
  const popupContainer = document.querySelector('.footer');

  cardsContainers.forEach((cardsContainer) => {
    cardsContainer.addEventListener('click', (clickEvt) => {
      const activePopup = document.querySelector('.film-details');
      if (activePopup) {
        activePopup.remove();
      }
      //todo: Реализовать подстановку данных того фильма, на который кликнули, вместо случайного
      const movieItem = moviesData[getRandomInteger(0, moviesData.length - 1)];
      const {comments} = movieItem;
      const filmPopup = new FilmPopup(movieItem).getElement();

      if (
        clickEvt.target.classList.contains('film-card__poster') ||
        clickEvt.target.classList.contains('film-card__title') ||
        clickEvt.target.classList.contains('film-card__comments')
      ) {
        insertDOMElement(popupContainer, filmPopup, Positions.AFTEREND);
        document.body.style.overflow = 'hidden';
        const popup = document.querySelector('.film-details');
        const closeButton = popup.querySelector('.film-details__close-btn');
        const commentsContainer = popup.querySelector('.film-details__comments-list');

        const closePopupByEsc = (keyDownEvt) => {
          if (isEscEvent(keyDownEvt)) {
            popup.remove();
            document.removeEventListener('keydown', closePopupByEsc);
            document.body.style.overflow = '';
          }
        };

        const closePopupByClick = () => {
          popup.remove();
          document.removeEventListener('keydown', closePopupByEsc);
          document.body.style.overflow = '';
        };

        document.addEventListener('keydown', closePopupByEsc);
        closeButton.addEventListener('click', closePopupByClick);

        comments.forEach((commentItem) => {
          const comment = new CommentItem(commentItem).getElement();
          insertDOMElement(commentsContainer, comment, Positions.BEFOREEND);
        });
      }
    });
  });
};
