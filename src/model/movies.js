import AbstractObserver from '../utils/abstract-observer';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, updateBody) {
    const movieIndex = this._movies.findIndex((item) => +item.id === +updateBody.id);

    if (movieIndex === -1) {
      throw new Error(`Update error. Item with index ${updateBody.id} does not exist`);
    }

    this._movies = [
      ...this._movies.slice(0, movieIndex),
      updateBody,
      ...this._movies.slice(movieIndex + 1),
    ];

    this._notify(updateType, updateBody);
  }
}
