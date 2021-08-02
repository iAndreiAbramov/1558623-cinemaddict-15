import {moviesData} from '../mock-data/movies-data';

export const getNumberOfFilmsHtml = () => `
    <p>${moviesData.length} movies inside</p>
  `;
