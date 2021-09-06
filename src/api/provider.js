import {isOnline} from '../utils/common';
import MoviesModel from '../model/movies-model';

const getUpdatedMovies = (movies) => Object.values(movies).filter((item) => item.userDetails);

const createStoreStructure = (data) => data.reduce((acc, cur) => Object.assign(
  {},
  acc,
  {[cur.id]: cur},
), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  pullMovies() {
    if (isOnline()) {
      return this._api.pullMovies()
        .then((movies) => {
          const movieItems = createStoreStructure(movies);
          this._store.setItems(movieItems);

          return movies.map(MoviesModel.adaptMovieToClient);
        });
    }

    const storedMovies = Object.values(this._store.getItems());
    return Promise.resolve(storedMovies.map(MoviesModel.adaptMovieToClient));
  }

  putMovie(id, body) {
    if (isOnline()) {
      return this._api.putMovie(id, body)
        .then((newMovie) => {
          this._store.setItem(id, newMovie);
          return newMovie;
        });
    }

    this._store.setItem(id, Object.assign({}, body));
    return Promise.resolve(body);
  }

  pullComments(movieId) {
    if (isOnline()) {
      return this._api.pullComments(movieId);
    }

    return Promise.reject('Can\'t load comments while disconnected.');
  }

  postComment(movieId, comment) {
    if (isOnline()) {
      return this._api.postComment(movieId, comment);
    }

    return Promise.reject('Can\'t add comments while disconnected.');
  }

  deleteComment(commentId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId);
    }

    return Promise.reject('Can\'t delete comment while disconnected.');
  }

  sync() {
    if (isOnline()) {
      const storedMovies = this._store.getItems();
      const updatedMovies = getUpdatedMovies(storedMovies);
      return this._api.sync(updatedMovies)
        .then((response) => {
          this._store.setItems(createStoreStructure(response['updated']));
        });
    }
    return Promise.reject(new Error('Synchronization failed, server is unavailable.'));
  }
}
