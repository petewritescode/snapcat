import { createSelector } from '@reduxjs/toolkit';
import { Scores } from '../../types/scores.type';
import { VotesState } from './votes.slice';

const getSlice = (state: { votes: VotesState }) => state.votes;
const getLoading = createSelector(getSlice, (slice) => slice.loading);
const getError = createSelector(getSlice, (slice) => slice.error);
const getVotes = createSelector(getSlice, (slice) => slice.votes);
const getActiveVotes = createSelector(getVotes, (votes) =>
  votes.filter(({ toDelete }) => !toDelete)
);

const getScores = createSelector(getActiveVotes, (votes) =>
  votes.reduce<Scores>((acc, vote) => {
    if (!acc[vote.imageId]) {
      acc[vote.imageId] = 0;
    }

    acc[vote.imageId] += vote.direction === 'up' ? 1 : -1;

    return acc;
  }, {})
);

export const votesSelectors = {
  getLoading,
  getError,
  getActiveVotes,
  getScores,
};
