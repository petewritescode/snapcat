import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addFavourite,
  deleteFavourite,
  getFavourites,
} from '../../services/api.service';
import { favouritesActions } from '../../store/favourites/favourites.slice';
import { imagesActions } from '../../store/images/images.slice';
import { ApiFavourite } from '../../types/api-favourite.type';
import { ApiNewFavourite } from '../../types/api-new-favourite.type';
import { Favourite } from '../../types/favourite.type';

function* getFavouritesSaga() {
  try {
    const favourites: Favourite[] = yield call(() =>
      getFavourites()
        .then((response) => response.json())
        .then((favourites: ApiFavourite[]) =>
          favourites.map<Favourite>((favourite) => ({
            id: favourite.id,
            imageId: favourite.image_id,
          }))
        )
    );

    yield put(favouritesActions.getFavouritesSuccess(favourites));
  } catch {
    yield put(imagesActions.getImagesFailure());
  }
}

function* addFavouriteSaga(action: { payload: string }) {
  try {
    const id: number = yield call(() =>
      addFavourite(action.payload)
        .then((response) => response.json())
        .then((favourite: ApiNewFavourite) => favourite.id)
    );

    if (id) {
      yield put(favouritesActions.addFavouriteSuccess(action.payload, id));
    }
  } catch {
    yield put(favouritesActions.addFavouriteFailure(action.payload));
  }
}

function* deleteFavouriteSaga(action: { payload: number }) {
  try {
    yield call(() => deleteFavourite(action.payload));
    yield put(favouritesActions.deleteFavouriteSuccess(action.payload));
  } catch {
    yield put(favouritesActions.deleteFavouriteFailure(action.payload));
  }
}

export function* watchGetFavourites() {
  yield takeEvery(favouritesActions.getFavourites, getFavouritesSaga);
}

export function* watchAddFavourite() {
  yield takeEvery(favouritesActions.addFavourite, addFavouriteSaga);
}

export function* watchDeleteFavourite() {
  yield takeEvery(favouritesActions.deleteFavourite, deleteFavouriteSaga);
}
