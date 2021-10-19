import { createSelector } from '@reduxjs/toolkit';
import { VoteCounts } from '../../types/vote-counts.type';
import { VotesState } from './votes.slice';

const getSlice = (state: { votes: VotesState }) => state.votes;
const getLoading = createSelector(getSlice, (slice) => slice.loading);
const getError = createSelector(getSlice, (slice) => slice.error);
const getVotes = createSelector(getSlice, (slice) => slice.votes);

const getActiveVotes = createSelector(getVotes, (votes) =>
  votes.filter(({ toDelete }) => !toDelete)
);

const getUserVotes = createSelector(getActiveVotes, (votes) =>
  votes.filter(({ isCurrentUser }) => isCurrentUser)
);

const getVoteCounts = createSelector(getActiveVotes, (votes) =>
  votes.reduce<VoteCounts>((acc, vote) => {
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
  getUserVotes,
  getVoteCounts,
};
