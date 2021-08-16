import FilmCard from '../view/film-card';
import {insertDOMElement, Positions} from '../utils/render';
import {sortByCommentsNumber, sortByRating} from '../modules/data-sort';
import {getAllMovies} from '../modules/data-filters';

const NUMBER_OF_EXTRA_CARDS = 2;

export default class ExtraPresenter {
  constructor() {
    this._data = getAllMovies();
    this._topRatedContainer = document.querySelectorAll('.films-list__container')[1];
    this._mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];
  }

  init() {
    this._renderTopRated();
    this._renderMostCommented();
  }

  _render(container, data) {
    const cardsNumberToShow = Math.min(this._data.length, NUMBER_OF_EXTRA_CARDS);
    for (let i = 0; i < cardsNumberToShow; i++) {
      const filmCard = new FilmCard(data[i]);
      insertDOMElement(container, filmCard, Positions.BEFOREEND);
    }
  }

  _renderTopRated() {
    this._render(this._topRatedContainer, sortByRating(this._data));
  }

  _renderMostCommented() {
    this._render(this._mostCommentedContainer, sortByCommentsNumber(this._data));
  }
}
