import { call, put, takeEvery } from 'redux-saga/effects';
import { addImage, getImages } from '../../services/api.service';
import { imagesActions } from '../../store/images/images.slice';
import { ApiError } from '../../types/api-error.type';
import { ApiImage } from '../../types/api-image.type';
import { Image } from '../../types/image.type';

function* getImagesSaga() {
  try {
    const images: Image[] = yield call(() =>
      getImages()
        .then((response) => response.json())
        .then((images: ApiImage[]) =>
          images.map<Image>((image) => ({
            id: image.id,
            url: image.url,
          })),
        ),
    );

    yield put(imagesActions.getImagesSuccess(images));
  } catch (error) {
    yield put(imagesActions.getImagesFailure());
  }
}

function* addImageSaga(action: { payload: File }) {
  try {
    const response: Response = yield call(() => addImage(action.payload));

    if (response.ok) {
      const image: ApiImage = yield response.json();
      yield put(imagesActions.addImageSuccess(image.id, image.url));
    } else {
      const error: ApiError = yield response.json();
      yield put(imagesActions.addImageFailure(error.message));
    }
  } catch {
    yield put(
      imagesActions.addImageFailure(
        'There was an error uploading your file, please try again',
      ),
    );
  }
}

export function* watchGetImages() {
  yield takeEvery(imagesActions.getImages, getImagesSaga);
}

export function* watchAddImage() {
  yield takeEvery(imagesActions.addImage, addImageSaga);
}
