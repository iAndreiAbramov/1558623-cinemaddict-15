export const UserAction = {
  TOGGLE_CATEGORY: 'TOGGLE_CATEGORY',
  TOGGLE_SORT: 'TOGGLE_SORT',
  TOGGLE_FILTER: 'TOGGLE_FILTER',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  POPUP_CONTROLS: 'POPUP_CONTROLS',
  SINGLE_CARD_INSTANCES_AND_STATS: 'SINGLE_CARD_INSTANCES_AND_STATS',
  MAIN_LIST: 'MAIN_LIST', // включая кнопку Show more
  ALL_LISTS: 'ALL_LISTS',
  COMMENTS: 'COMMENTS',
};

export const Filters = {
  ALL: null,
  WATCHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITE: 'favorite',
};
