import {moviesData} from './mock-data/movies-data';
import {setOpenPopupHandler} from './modules/show-popup-handler';
import {setMoreButtonHandler} from './modules/more-button-handler';
import {renderUserRank} from './modules/render-user-rank';
import {renderFilmsNumber} from './modules/render-films-number';
import {renderFiltersMenu} from './modules/render-filters-menu';
import {renderSortPanel} from './modules/render-sort-panel';
import {renderCardsContainers} from './modules/render-cards-containers';
import {renderFilmsList} from './modules/render-films-list';
import {renderAllExtraData} from './modules/render-all-extra-data';

document.addEventListener('DOMContentLoaded', () => {
  renderFilmsNumber();
  renderUserRank();
  renderFiltersMenu();
  renderSortPanel();
  renderCardsContainers();
  renderFilmsList(moviesData);
  renderAllExtraData();
  setOpenPopupHandler('.films-list__container');
  setMoreButtonHandler();

// eslint-disable-next-line no-console
//console.log(moviesData[0]);
});
