import { call, put, takeEvery } from 'redux-saga/effects';
import { addVote, deleteVote, getVotes } from '../../services/api.service';
import { votesActions } from '../../store/votes/votes.slice';
import { ApiNewVote } from '../../types/api-new-vote.type';
import { ApiVote } from '../../types/api-vote.type';
import { VoteDirection } from '../../types/vote-direction.type';
import { Vote } from '../../types/vote.type';
import { getUserId } from '../../utils/get-user-id.util';

const userId = getUserId();

function* getVotesSaga() {
  try {
    const votes: Vote[] = yield call(() =>
      getVotes()
        .then((response) => response.json())
        .then((votes: ApiVote[]) =>
          votes.map<Vote>((vote) => ({
            id: vote.id,
            imageId: vote.image_id,
            isCurrentUser: vote.sub_id === userId,
            direction: vote.value === 1 ? 'up' : 'down',
          })),
        ),
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
        .then((vote: ApiNewVote) => vote.id),
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

export function* watchGetVotes() {
  yield takeEvery(votesActions.getVotes, getVotesSaga);
}

export function* watchAddVote() {
  yield takeEvery(votesActions.addVote, addVoteSaga);
}

export function* watchDeleteVote() {
  yield takeEvery(votesActions.deleteVote, deleteVoteSaga);
}
