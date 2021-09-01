import FilmCard from '../view/film-card';
import {Positions, insertDOMElement} from '../utils/render';
import MessageForEmptyList from '../view/message-for-empty-list';
import MoreButton from '../view/more-button';
import LoadingMessage from '../view/loading-message';

const DEFAULT_CARDS_NUMBER = 5;
const CARDS_COUNT_STEP = 5;

export default class FilmsListPresenter {
  constructor(data) {
    this._data = data;
    this._container = document.querySelectorAll('.films-list__container')[0];
    this._showMoreButton = new MoreButton();
    this._shownCards = new Map();
    this._initialCardsNumber = Math.min(DEFAULT_CARDS_NUMBER, data.length);
    this._cardsCountStep = CARDS_COUNT_STEP;
    this._messageElement = null;
    this._handleMoreButtonClick = this._handleMoreButtonClick.bind(this);

    this._state = {
      cardsShown: 0,
      moreButtonShown: false,
      messageShown: false,
    };
  }

  init() {
    this.clear();
    this.renderDefault(this._data);
  }

  clear() {
    this._shownCards.forEach((value) => {
      value.remove();
    });
    this._shownCards.clear();
    this._showMoreButton.getElement().remove();
    if (this._messageElement) {
      this._messageElement.remove();
    }
  }

  renderDefault(data) {
    const cardsToShow = Math.max(this._state.cardsShown, this._initialCardsNumber);
    if (data.length > 0) {
      this._render(data, 0, cardsToShow);
    } else {
      this._renderEmpty();
    }
    if (data.length > cardsToShow) {
      this._showMoreButton.setClickHandler(this._handleMoreButtonClick);
      insertDOMElement(this._container, this._showMoreButton, Positions.AFTEREND);
    }
  }

  _render(data, from, to) {
    const dataToRender = data.slice(from, to);
    dataToRender.forEach((dataItem) => {
      const {id} = dataItem;
      const filmCard = new FilmCard(dataItem);
      insertDOMElement(this._container, filmCard, Positions.BEFOREEND);
      this._shownCards.set(id, filmCard.getElement());
    });
    this._state.cardsShown = this._shownCards.size;
  }

  _renderEmpty() {
    const getMessageForEmpty = (option) => {
      const messagesForEmpty = {
        '#all': 'There are no movies in our database',
        '#watchlist': 'There are no movies to watch now',
        '#history': 'There are no watched movies now',
        '#favorites': 'There are no favorite movies now',
      };
      return messagesForEmpty[option];
    };

    const getMessageOption = () => {
      if (this._messageElement) {
        this._messageElement.remove();
      }
      const activeFilterElement = document.querySelector('.main-navigation__item--active');
      return activeFilterElement.getAttribute('href');
    };
    const message = getMessageForEmpty(getMessageOption());
    const messageElement = new MessageForEmptyList(message);
    this._messageElement = messageElement.getElement();
    insertDOMElement(this._container, messageElement, Positions.AFTERBEGIN);
  }

  _handleMoreButtonClick() {
    const cardsNumberToShow = Math.min(this._shownCards.size + this._cardsCountStep, this._data.length);

    this._render(this._data, this._state.cardsShown, cardsNumberToShow);

    if (this._shownCards.size === this._data.length) {
      this._showMoreButton.getElement().remove();
    }
  }
}
