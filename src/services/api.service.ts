import { USER_ID } from '../constants/user.constants';
import { RequestMethod } from '../types/request-method.type';
import { VoteDirection } from '../types/vote-direction.type';

const makeRequest = (
  endpoint: string,
  method: RequestMethod = 'GET',
  headers?: RequestInit['headers'],
  body?: RequestInit['body']
) =>
  fetch(`https://api.thecatapi.com/v1/${endpoint}`, {
    method,
    headers: {
      'x-api-key': 'cd0ce337-6ba0-44b3-9a55-ab8eb2cdeb90',
      ...headers,
    },
    body,
  });

// TODO Build these params in a better way?
export const getImages = () => makeRequest('images?limit=100');

export const addImage = (image: File) => {
  const body = new FormData();
  body.append('sub_id', USER_ID);
  body.append('file', image);

  return makeRequest('images/upload', 'POST', undefined, body);
};

export const getFavourites = () =>
  makeRequest(`favourites?limit=100&sub_id=${USER_ID}`);

export const addFavourite = (imageId: string) => {
  const headers = { 'Content-Type': 'application/json' };

  const body = JSON.stringify({
    sub_id: USER_ID,
    image_id: imageId,
  });

  return makeRequest('favourites', 'POST', headers, body);
};

export const deleteFavourite = (id: number) => {
  return makeRequest(`favourites/${id}`, 'DELETE');
};

export const getVotes = () => makeRequest('votes');

export const addVote = (imageId: string, direction: VoteDirection) => {
  const headers = { 'Content-Type': 'application/json' };

  const body = JSON.stringify({
    sub_id: USER_ID,
    image_id: imageId,
    value: direction === 'up' ? 1 : 0,
  });

  return makeRequest('votes', 'POST', headers, body);
};

export const deleteVote = (id: number) => {
  return makeRequest(`votes/${id}`, 'DELETE');
};
