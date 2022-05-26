import { createSelector } from '@reduxjs/toolkit';
import { FavouritesState } from './favourites.slice';

const getSlice = (state: { favourites: FavouritesState }) => state.favourites;
const getLoading = createSelector(getSlice, (slice) => slice.loading);
const getError = createSelector(getSlice, (slice) => slice.error);
const getFavourites = createSelector(getSlice, (slice) => slice.favourites);
const getActiveFavourites = createSelector(getFavourites, (favourites) =>
  favourites.filter(({ toDelete }) => !toDelete),
);

export const favouritesSelectors = {
  getLoading,
  getError,
  getActiveFavourites,
};
