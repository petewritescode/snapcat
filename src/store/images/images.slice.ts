import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image } from '../../types/image.type';

export interface ImagesState {
  loading: boolean;
  error: boolean;
  uploading: boolean;
  uploadError?: string;
  images: Image[];
}

const initialState: ImagesState = {
  loading: false,
  error: false,
  uploading: false,
  images: [],
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    getImages: (state) => {
      state.loading = true;
      state.error = false;
    },
    getImagesSuccess: {
      prepare: (images: Image[]) => ({
        payload: images,
      }),
      reducer: (state, action: PayloadAction<Image[]>) => {
        state.loading = false;
        state.images = action.payload;
      },
    },
    getImagesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addImage: {
      prepare: (image: File) => ({
        payload: image,
      }),
      reducer: (state, action: PayloadAction<File>) => {
        state.uploading = true;
        state.uploadError = undefined;
      },
    },
    addImageSuccess: {
      prepare: (id: string, url: string) => ({
        payload: {
          id,
          url,
        },
      }),
      reducer: (state, action: PayloadAction<{ id: string; url: string }>) => {
        state.uploading = false;

        const image = {
          id: action.payload.id,
          url: action.payload.url,
        };

        state.images = [image, ...state.images];
      },
    },
    addImageFailure: {
      prepare: (error: string) => ({
        payload: error,
      }),
      reducer: (state, action: PayloadAction<string>) => {
        state.uploading = false;
        state.uploadError = action.payload;
      },
    },
  },
});

export const imagesActions = imagesSlice.actions;
export const imagesReducer = imagesSlice.reducer;
