import FilmsListContainer from '../view/films-list-container';
import ExtraContainer from '../view/extra-container';
import NumberOfFilms from '../view/number-of-films';
import ListsContainer from '../view/lists-container';
import {Positions, insertDOMElement, replaceDOMElement} from '../utils/render';
import UserRankView from '../view/user-rank';
import FiltersMenu from '../view/filters-menu';
import SortPanel from '../view/sort-panel';
import FilmCard from '../view/film-card';
import {getAllMovies, getWatchedMovies} from '../modules/data-filters';
import {getMovieById, getMovieIndexById} from '../utils/common';
import {moviesData} from '../mock-data/movies-data';
import FilmsListPresenter from './films-list-presenter';
import ExtraPresenter from './extra-presenter';
import PopupPresenter from './popup-presenter';

export default class ShellPresenter {
  constructor() {
    this._userRankContainer = document.querySelector('.header');
    this._mainContainer = document.querySelector('.main');
    this._numberOfFilmsContainer = document.querySelector('.footer__statistics');
    this._sortPanel = new SortPanel();
    this._listsContainer = new ListsContainer();
    this._filmsContainer = new FilmsListContainer();
    this._topRatedContainer = new ExtraContainer('Top rated');
    this._mostCommentedContainer = new ExtraContainer('Most commented');
    this._previusPopup = null;
    this._handleContainerClick = this._handleContainerClick.bind(this);
    this._States = {
      userRank: null,
      filtersMenu: false,
      sortPanel: false,
      filmsContainers: false,
      extraContainers: false,
    };
  }

  init() {
    this._renderFilmsNumber(getAllMovies());
    this._renderUserRank(getAllMovies());
    this._renderFiltersMenu(getAllMovies());
    this._renderSortPanel();
    this._renderFilmsContainers();
    this._renderFilmsList(getAllMovies());
    this._renderExtraContainers();
  }

  // Рендер поля с количеством фильмов в базе
  _renderFilmsNumber(data) {
    const numberOfFilms = new NumberOfFilms(data);
    insertDOMElement(this._numberOfFilmsContainer, numberOfFilms, Positions.BEFOREEND);
  }

  // Рендер поля ранга пользователя
  _renderUserRank(data) {
    const oldUserRank = this._userRankContainer.querySelector('.header__profile');
    if (oldUserRank) {
      oldUserRank.remove();
    }
    const userRank = new UserRankView(data);
    insertDOMElement(this._userRankContainer, userRank, Positions.BEFOREEND);
  }

  // Рендер меню фильтров
  _renderFiltersMenu(data) {
    const oldMenu = this._mainContainer.querySelector('.main-navigation');
    if (oldMenu) {
      oldMenu.remove();
    }
    const filtersMenu = new FiltersMenu(data);
    insertDOMElement(this._mainContainer, filtersMenu, Positions.AFTERBEGIN);
  }

  // Отрисовка панели сортировки
  _renderSortPanel() {
    insertDOMElement(this._mainContainer, this._sortPanel, Positions.BEFOREEND);
  }

  // Обработчик клика по любому контейнеру с фильмами
  // Содержит в себе открытие и закрытие попапа, добавление и удаление фильма
  // в категорию при клике на соотв. кнопку в карточке и в попапе
  _handleContainerClick() {
    const cardsContainers = document.querySelectorAll('.films-list__container');

    // Обработчик клика на все контейнеры с карточками
    cardsContainers.forEach((cardsContainer) => {
      cardsContainer.addEventListener('click', (clickEvt) => {
        clickEvt.preventDefault();
        clickEvt.stopImmediatePropagation();

        const targetId = clickEvt.target.closest('article').getAttribute('data-id');
        const movieItem = getMovieById(getAllMovies(), targetId);

        // Открытие попапа
        if (
          clickEvt.target.classList.contains('film-card__poster') ||
          clickEvt.target.classList.contains('film-card__title') ||
          clickEvt.target.classList.contains('film-card__comments')
        ) {
          if (!this._previusPopup || !this._previusPopup.isOpened) {
            const filmPopup = new PopupPresenter(movieItem);
            filmPopup.init();
            this._previusPopup = filmPopup;
          }
        }

        // Если клик по контролам карточки фильма
        if (clickEvt.target.classList.contains('film-card__controls-item')) {
          const oldCard = clickEvt.target.closest('article');
          const id = oldCard.getAttribute('data-id');
          const option = clickEvt.target.getAttribute('data-details');

          this._updateUserDetails(id, option);
          this._renderFiltersMenu(getAllMovies());
          this._renderUserRank(getWatchedMovies());
          this._renderSingleCard(cardsContainers, id);
        }
      });
    });
  }

  // отрисовка основного и дополнительных контейнеров
  _renderFilmsContainers() {
    this._listsContainer.setClickCallback(this._handleContainerClick);

    insertDOMElement(this._mainContainer, this._listsContainer, Positions.BEFOREEND);

    const filmListsContainer = document.querySelector('.films');

    insertDOMElement(filmListsContainer, this._filmsContainer, Positions.AFTERBEGIN);
    insertDOMElement(filmListsContainer, this._topRatedContainer, Positions.BEFOREEND);
    insertDOMElement(filmListsContainer, this._mostCommentedContainer, Positions.BEFOREEND);
  }

  // Перерисовка списка фильмов
  _renderFilmsList(data) {
    const filmList = new FilmsListPresenter(data);
    filmList.init();
  }

  // Обновление данных в доп. контейнерах
  _renderExtraContainers() {
    const extraContainers = new ExtraPresenter();
    extraContainers.init();
  }

  // Обновление данных одной карточки во всех местах, где она отображается
  _renderSingleCard(containers, id) {
    containers.forEach((container) => {
      const cards = [...container.children];
      const oldCard = cards.find((card) => card.getAttribute('data-id') === id);
      if (oldCard) {
        const movieIndex = getMovieIndexById(moviesData, id);
        const newCard = new FilmCard(moviesData[movieIndex]);

        replaceDOMElement(container, newCard, oldCard);
      }
    });
  }

  // обновление данных в хранилище о при добавлении в категорию или удалении фильма
  _updateUserDetails(movieId, option) {
    const movieData = getMovieById(moviesData, movieId);
    movieData.userDetails[option] = !movieData.userDetails[option];
  }
}
