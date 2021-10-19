import { all } from 'redux-saga/effects';
import {
  watchAddFavourite,
  watchDeleteFavourite,
  watchGetFavourites,
} from './favourites/favourites.sagas';
import { watchAddImage, watchGetImages } from './images/images.sagas';
import {
  watchAddVote,
  watchDeleteVote,
  watchGetVotes,
} from './votes/votes.sagas';

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
