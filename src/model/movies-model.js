import AbstractObserver from '../utils/abstract-observer';

export default class MoviesModel extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();
    this._notify(updateType, this._movies);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, updateBody = null) {
    if (updateBody) {
      const movieIndex = this._movies.findIndex((item) => +item.id === +updateBody.id);

      if (movieIndex === -1) {
        throw new Error(`Update error. Item with index ${updateBody.id} does not exist`);
      }

      this._movies = [
        ...this._movies.slice(0, movieIndex),
        updateBody,
        ...this._movies.slice(movieIndex + 1),
      ];
    }

    this._notify(updateType, updateBody);
  }

  static adaptMovieToClient(movie) {
    const updatedMovie = Object.assign(
      {},
      movie,
    );

    updatedMovie.filmInfo = Object.assign({}, movie['film_info']);
    updatedMovie.filmInfo.ageRating = movie['film_info']['age_rating'];
    updatedMovie.filmInfo.alternativeTitle = movie['film_info']['alternative_title'];
    updatedMovie.filmInfo.totalRating = movie['film_info']['total_rating'];
    updatedMovie.filmInfo.release = Object.assign({}, movie['film_info']['release']);
    updatedMovie.filmInfo.release.releaseCountry = movie['film_info']['release']['release_country'];

    updatedMovie.userDetails = Object.assign({}, movie['user_details']);
    updatedMovie.userDetails.alreadyWatched = movie['user_details']['already_watched'];
    updatedMovie.userDetails.watchingDate = movie['user_details']['watching_date'];

    delete updatedMovie['film_info'];
    delete updatedMovie['filmInfo']['age_rating'];
    delete updatedMovie['filmInfo']['alternative_title'];
    delete updatedMovie['filmInfo']['total_rating'];
    delete updatedMovie['filmInfo']['release']['release_country'];

    delete updatedMovie['user_details'];
    delete updatedMovie['userDetails']['already_watched'];
    delete updatedMovie['userDetails']['watching_date'];

    return updatedMovie;
  }

  static adaptMovieToServer(movie) {
    const updatedMovie = Object.assign(
      {},
      movie,
    );

    updatedMovie['film_info'] = Object.assign({}, movie.filmInfo);
    updatedMovie['film_info']['age_rating'] = movie.filmInfo.ageRating;
    updatedMovie['film_info']['alternative_title'] = movie.filmInfo.alternativeTitle;
    updatedMovie['film_info']['total_rating'] = movie.filmInfo.totalRating;
    updatedMovie['film_info']['release'] = Object.assign({}, movie.filmInfo.release);
    updatedMovie['film_info']['release']['release_country'] = movie.filmInfo.release.releaseCountry;

    updatedMovie['user_details'] = Object.assign({}, movie.userDetails);
    updatedMovie['user_details']['already_watched'] = movie.userDetails.alreadyWatched;
    updatedMovie['user_details']['watching_date'] = movie.userDetails.watchingDate;

    delete updatedMovie.filmInfo;
    delete updatedMovie['film_info']['ageRating'];
    delete updatedMovie['film_info']['alternativeTitle'];
    delete updatedMovie['film_info']['totalRating'];
    delete updatedMovie['film_info']['release']['releaseCountry'];

    delete updatedMovie['user_details']['userDetails'];
    delete updatedMovie['user_details']['alreadyWatched'];
    delete updatedMovie['user_details']['watchingDate'];

    return updatedMovie;
  }
}
