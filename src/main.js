import {renderFilmsNumber} from './modules/render-films-number';
import {renderFiltersMenu} from './modules/render-filters-menu';
import {renderSortPanel} from './modules/render-sort-panel';
import {renderCardsContainers} from './modules/render-cards-containers';
import {renderFilmsList} from './modules/render-films-list';
import {renderAllExtraData} from './modules/render-all-extra-data';
import {renderUserRank} from './modules/render-user-rank';
import {getAllMovies} from './modules/data-filters';

document.addEventListener('DOMContentLoaded', () => {
  renderFilmsNumber(getAllMovies());
  renderUserRank(getAllMovies());
  renderFiltersMenu(getAllMovies());
  renderSortPanel();
  renderCardsContainers();
  renderFilmsList(getAllMovies());
  renderAllExtraData(getAllMovies());
});
