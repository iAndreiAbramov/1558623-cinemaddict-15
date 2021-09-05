import {isOnline} from '../utils/common';

const getSyncedMovies = () => {

};

const createStoreStructure = (data) => {
  return data.reduce((acc, cur) => {
    return Object.assign({}, acc, {
      [cur.id]: cur,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  pullMovies() {
    if (isOnline()) {
      this._api.pullMovies();
    }
  };

  putMovie(id, body) {};

  pullComments(movieId) {
    if (isOnline()) {
      this._api.pullMovies();
    }
  };

  postComment(movieId, comment) {};

  deleteComment(commentId) {};

  sync(body) {};

  _load() {};

  _isOnline() {

  }
}
