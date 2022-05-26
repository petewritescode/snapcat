import { API_BASE_URL, API_KEY } from '../constants/api.constants';
import { RequestMethod } from '../types/request-method.type';
import { VoteDirection } from '../types/vote-direction.type';
import { getUserId } from '../utils/get-user-id.util';

const userId = getUserId();

const jsonHeaders = {
  'Content-Type': 'application/json',
};

const makeRequest = (
  resource: string,
  method: RequestMethod = 'GET',
  body?: RequestInit['body'],
  headers?: RequestInit['headers'],
) =>
  fetch(`${API_BASE_URL}/${resource}`, {
    method,
    headers: {
      'x-api-key': API_KEY,
      ...headers,
    },
    body,
  });

export const getImages = () => makeRequest('images?limit=100');

export const addImage = (image: File) => {
  const body = new FormData();
  body.append('sub_id', userId);
  body.append('file', image);

  return makeRequest('images/upload', 'POST', body);
};

export const getFavourites = () =>
  makeRequest(`favourites?limit=100&sub_id=${encodeURIComponent(userId)}`);

export const addFavourite = (imageId: string) => {
  const body = JSON.stringify({
    sub_id: userId,
    image_id: imageId,
  });

  return makeRequest('favourites', 'POST', body, jsonHeaders);
};

export const deleteFavourite = (id: number) => {
  return makeRequest(`favourites/${encodeURIComponent(id)}`, 'DELETE');
};

export const getVotes = () => makeRequest('votes');

export const addVote = (imageId: string, direction: VoteDirection) => {
  const body = JSON.stringify({
    sub_id: userId,
    image_id: imageId,
    value: direction === 'up' ? 1 : 0,
  });

  return makeRequest('votes', 'POST', body, jsonHeaders);
};

export const deleteVote = (id: number) => {
  return makeRequest(`votes/${encodeURIComponent(id)}`, 'DELETE');
};
