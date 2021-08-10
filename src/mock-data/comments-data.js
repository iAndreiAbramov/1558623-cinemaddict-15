import {getRandomDate} from '../utils/date';
import {CommentAuthors, Comments, Emotions} from './data-sets';
import {getRandomInteger, getRandomItem} from '../utils/common';

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
