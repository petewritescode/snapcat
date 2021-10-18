import { combineReducers } from '@reduxjs/toolkit';
import { favouritesReducer } from './favourites/favourites.slice';
import { imagesReducer } from './images/images.slice';
import { votesReducer } from './votes/votes.slice';

export const rootReducer = combineReducers({
  favourites: favouritesReducer,
  images: imagesReducer,
  votes: votesReducer,
});
