import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  addFavourite,
  addImage,
  addVote,
  deleteFavourite,
  deleteVote,
  getFavourites,
  getImages,
  getVotes,
} from '../services/api.service';
import { favouritesActions } from '../store/favourites/favourites.slice';
import { imagesActions } from '../store/images/images.slice';
import { votesActions } from '../store/votes/votes.slice';
import { AddImageResponseError } from '../types/add-image-response-error.type';
import { AddImageResponseSuccess } from '../types/add-image-response-success.type';
import { Favourite } from '../types/favourite.type';
import { Image } from '../types/image.type';
import { VoteDirection } from '../types/vote-direction.type';
import { Vote } from '../types/vote.type';
import { getUserId } from '../utils/get-user-id.util';

const userId = getUserId();

function* getImagesSaga() {
  try {
    const images: Image[] = yield call(() =>
      getImages()
        .then((response) => response.json())
        .then((images: any[]) =>
          images.map<Image>((image) => ({
            id: image.id,
            url: image.url,
          }))
        )
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
      const { id, url }: AddImageResponseSuccess = yield response.json();
      yield put(imagesActions.addImageSuccess(id, url));
    } else {
      const { message }: AddImageResponseError = yield response.json();
      yield put(imagesActions.addImageFailure(message));
    }
  } catch {
    yield put(
      imagesActions.addImageFailure(
        'There was an error uploading your file, please try again'
      )
    );
  }
}

function* getFavouritesSaga() {
  try {
    const favourites: Favourite[] = yield call(() =>
      getFavourites()
        .then((response) => response.json())
        .then((favourites: any[]) =>
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
        .then((data) => data.id)
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

function* getVotesSaga() {
  try {
    const votes: Vote[] = yield call(() =>
      getVotes()
        .then((response) => response.json())
        .then((votes: any[]) =>
          votes.map<Vote>((vote) => ({
            id: vote.id,
            imageId: vote.image_id,
            isCurrentUser: vote.sub_id === userId,
            direction: vote.value === 1 ? 'up' : 'down',
          }))
        )
    );

    yield put(votesActions.getVotesSuccess(votes));
  } catch {
    yield put(votesActions.getVotesFailure());
  }
}

function* addVoteSaga(action: {
  payload: { imageId: string; direction: VoteDirection };
}) {
  try {
    const id: number = yield call(() =>
      addVote(action.payload.imageId, action.payload.direction)
        .then((response) => response.json())
        .then((data) => data.id)
    );

    if (id) {
      yield put(votesActions.addVoteSuccess(action.payload.imageId, id));
    }
  } catch {
    yield put(votesActions.addVoteFailure(action.payload.imageId));
  }
}

function* deleteVoteSaga(action: { payload: number }) {
  try {
    yield call(() => deleteVote(action.payload));
    yield put(votesActions.deleteVoteSuccess(action.payload));
  } catch {
    yield put(votesActions.deleteVoteFailure(action.payload));
  }
}

function* watchGetImages() {
  yield takeEvery(imagesActions.getImages, getImagesSaga);
}

function* watchAddImage() {
  yield takeEvery(imagesActions.addImage, addImageSaga);
}

function* watchGetFavourites() {
  yield takeEvery(favouritesActions.getFavourites, getFavouritesSaga);
}

function* watchAddFavourite() {
  yield takeEvery(favouritesActions.addFavourite, addFavouriteSaga);
}

function* watchDeleteFavourite() {
  yield takeEvery(favouritesActions.deleteFavourite, deleteFavouriteSaga);
}

function* watchGetVotes() {
  yield takeEvery(votesActions.getVotes, getVotesSaga);
}

function* watchAddVote() {
  yield takeEvery(votesActions.addVote, addVoteSaga);
}

function* watchDeleteVote() {
  yield takeEvery(votesActions.deleteVote, deleteVoteSaga);
}

export function* rootSagas() {
  yield all([
    watchGetImages(),
    watchAddImage(),
    watchGetFavourites(),
    watchAddFavourite(),
    watchDeleteFavourite(),
    watchGetVotes(),
    watchAddVote(),
    watchDeleteVote(),
  ]);
}
