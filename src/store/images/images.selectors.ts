import { createSelector } from '@reduxjs/toolkit';
import { ImagesState } from './images.slice';

const getSlice = (state: { images: ImagesState }) => state.images;
const getLoading = createSelector(getSlice, (slice) => slice.loading);
const getError = createSelector(getSlice, (slice) => slice.error);
const getUploading = createSelector(getSlice, (slice) => slice.uploading);
const getUploadError = createSelector(getSlice, (slice) => slice.uploadError);
const getImages = createSelector(getSlice, (slice) => slice.images);

export const imagesSelectors = {
  getLoading,
  getError,
  getUploading,
  getUploadError,
  getImages,
};
