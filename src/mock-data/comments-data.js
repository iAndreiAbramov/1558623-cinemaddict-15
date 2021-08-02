import {getRandomDate, getRandomInteger, getRandomItem} from '../services/utils';
import {CommentAuthors, Comments, Emotions} from './data-sets';

const MIN_ID = 1;
const MAX_ID = 10000;

export const getRandomCommentsData = (numberOfComments) => {
  const comments = [];
  for (let i = 0; i < numberOfComments; i++) {
    comments.push({
      id: getRandomInteger(MIN_ID, MAX_ID),
      author: getRandomItem(CommentAuthors),
      comment: getRandomItem(Comments),
      date: getRandomDate('D MMMM YYYY'),
      emotion: getRandomItem(Emotions),
    });
  }
  return comments;
};
