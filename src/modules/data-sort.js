export const sortByRating = (filmsData) => filmsData.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

export const sortByCommentsNumber = (filmsData) => filmsData.slice().sort((a, b) => b.comments.length - a.comments.length);
