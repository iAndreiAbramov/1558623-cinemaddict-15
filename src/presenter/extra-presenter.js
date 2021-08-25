import FilmCard from '../view/film-card';
import {insertDOMElement, Positions} from '../utils/render';
import {sortData} from '../utils/sort-data';

const NUMBER_OF_EXTRA_CARDS = 2;

export default class ExtraPresenter {
  constructor(data) {
    this._data = data;
    this._cardsNumberToShow = Math.min(this._data.length, NUMBER_OF_EXTRA_CARDS);
    this._topRatedContainer = document.querySelectorAll('.films-list__container')[1];
    this._mostCommentedContainer = document.querySelectorAll('.films-list__container')[2];
    this._shownTopRated = new Map();
    this._shownMostCommented = new Map();
  }

  get shownTopRated() {
    return this._shownTopRated;
  }

  get shownMostCommented() {
    return this._shownMostCommented;
  }

  init() {
    this._renderTopRated();
    this._renderMostCommented();
  }

  _renderTopRated() {
    const data = sortData(this._data, 'rating').slice(0, this._cardsNumberToShow);
    data.forEach((dataItem) => {
      const filmCard = new FilmCard(dataItem);
      const {id} = dataItem;
      insertDOMElement(this._topRatedContainer, filmCard, Positions.BEFOREEND);
      this._shownTopRated.set(id, filmCard.getElement());
    });
  }

  _renderMostCommented() {
    const data = sortData(this._data, 'commentsNumber').slice(0, this._cardsNumberToShow);
    data.forEach((dataItem) => {
      const filmCard = new FilmCard(dataItem);
      const {id} = dataItem;
      insertDOMElement(this._mostCommentedContainer, filmCard, Positions.BEFOREEND);
      this._shownMostCommented.set(id, filmCard.getElement());
    });
  }
}
