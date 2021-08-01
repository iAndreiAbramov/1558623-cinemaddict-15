import {moviesData} from '../mock-data/film-data';

export const getNumberOfFilmsHtml = () => `
    <p>${moviesData.length} movies inside</p>
  `;
