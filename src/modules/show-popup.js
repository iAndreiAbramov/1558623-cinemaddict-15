import {getFilmPopupHtml} from '../view/film-popup';
import {getRandomInteger, insertHtmlElement, isEscEvent} from '../services/utils';
import {moviesData} from '../mock-data/movies-data';
import {getCommentItemHtml} from '../view/popup-comment';

export const setOpenPopupHandler = () => {
  const cardsContainer = document.querySelector('.films-list__container');
  const popupContainer = document.querySelector('.footer');

  cardsContainer.addEventListener('click', (clickEvt) => {
  //todo: Реализовать подстановку данных того фильма, на который кликнули, вместо случайного
    const movieItem = moviesData[getRandomInteger(0, moviesData.length - 1)];
    const {comments} = movieItem;
    const filmPopup = getFilmPopupHtml(movieItem);
    if (
      clickEvt.target.classList.contains('film-card__poster') ||
      clickEvt.target.classList.contains('film-card__title') ||
      clickEvt.target.classList.contains('film-card__comments')
    ) {
      insertHtmlElement(popupContainer, filmPopup, 'afterend');
      const popup = document.querySelector('.film-details');
      const closeButton = popup.querySelector('.film-details__close-btn');
      const commentsContainer = popup.querySelector('.film-details__comments-list');
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

      comments.forEach((commentItem) => {
        const comment = getCommentItemHtml(commentItem);
        insertHtmlElement(commentsContainer, comment, 'beforeend');
      });
    }
  });
};
