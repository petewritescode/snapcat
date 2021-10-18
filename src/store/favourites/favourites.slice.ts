import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favourite } from '../../types/favourite.type';

export interface FavouritesState {
  loading: boolean;
  error: boolean;
  favourites: Favourite[];
}

const initialState: FavouritesState = {
  loading: false,
  error: false,
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    getFavourites: (state) => {
      state.loading = true;
      state.error = false;
    },
    getFavouritesSuccess: {
      prepare: (favourites: Favourite[]) => ({
        payload: favourites,
      }),
      reducer: (state, action: PayloadAction<Favourite[]>) => {
        state.loading = false;
        state.favourites = action.payload;
      },
    },
    getFavouritesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addFavourite: {
      prepare: (imageId: string) => ({
        payload: imageId,
      }),
      reducer: (state, action: PayloadAction<string>) => {
        state.loading = true;
        state.favourites.push({
          imageId: action.payload,
        });
      },
    },
    addFavouriteSuccess: {
      prepare: (imageId: string, id: number) => ({
        payload: {
          imageId,
          id,
        },
      }),
      reducer: (
        state,
        action: PayloadAction<{ imageId: string; id: number }>
      ) => {
        state.loading = false;

        const favourite = state.favourites.find(
          ({ imageId }) => imageId === action.payload.imageId
        );

        if (favourite) {
          favourite.id = action.payload.id;
        }
      },
    },
    addFavouriteFailure: {
      prepare: (imageId: string) => ({
        payload: imageId,
      }),
      reducer: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.favourites = state.favourites.filter(
          ({ imageId }) => imageId !== action.payload
        );
      },
    },
    deleteFavourite: {
      prepare: (id: number) => ({
        payload: id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.loading = true;

        const favourite = state.favourites.find(
          ({ id }) => id === action.payload
        );

        if (favourite) {
          favourite.toDelete = true;
        }
      },
    },
    deleteFavouriteSuccess: {
      prepare: (id: number) => ({
        payload: id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.favourites = state.favourites.filter(
          ({ id }) => id !== action.payload
        );
      },
    },
    deleteFavouriteFailure: {
      prepare: (id: number) => ({
        payload: id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.loading = false;

        const favourite = state.favourites.find(
          ({ id }) => id === action.payload
        );

        if (favourite) {
          favourite.toDelete = false;
        }
      },
    },
  },
});

export const favouritesActions = favouritesSlice.actions;
export const favouritesReducer = favouritesSlice.reducer;
