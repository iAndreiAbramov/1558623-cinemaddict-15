import dayjs from 'dayjs';

const sortByRating = (filmsData) => filmsData.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

const sortByCommentsNumber = (filmsData) => filmsData.slice().sort((a, b) => b.comments.length - a.comments.length);

const sortMoviesByDate = (filmsData) => filmsData.slice().sort((a, b) => dayjs(b.filmInfo.release.date).diff(dayjs(a.filmInfo.release.date), 'ms'));

export const sortCommentsByDate = (comments) => comments.slice().sort((a, b) => dayjs(a.date).diff(dayjs(b.date), 'ms'));

export const sortData = (data, option = 'default') => {
  const SortOptions = {
    'default': data,
    'commentsNumber': sortByCommentsNumber(data),
    'rating': sortByRating(data),
    'date': sortMoviesByDate(data),
  };
  return SortOptions[option];
};
