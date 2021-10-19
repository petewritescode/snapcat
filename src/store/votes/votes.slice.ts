import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VoteDirection } from '../../types/vote-direction.type';
import { Vote } from '../../types/vote.type';

export interface VotesState {
  loading: boolean;
  error: boolean;
  votes: Vote[];
}

const initialState: VotesState = {
  loading: false,
  error: false,
  votes: [],
};

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    getVotes: (state) => {
      state.loading = true;
      state.error = false;
    },
    getVotesSuccess: {
      prepare: (votes: Vote[]) => ({
        payload: votes,
      }),
      reducer: (state, action: PayloadAction<Vote[]>) => {
        state.loading = false;
        state.votes = action.payload;
      },
    },
    getVotesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addVote: {
      prepare: (imageId: string, direction: VoteDirection) => ({
        payload: {
          imageId,
          direction,
        },
      }),
      reducer: (
        state,
        action: PayloadAction<{ imageId: string; direction: VoteDirection }>
      ) => {
        state.loading = true;

        const votes = state.votes.filter(
          ({ imageId, isCurrentUser }) =>
            imageId !== action.payload.imageId || !isCurrentUser
        );

        votes.push({
          imageId: action.payload.imageId,
          isCurrentUser: true,
          direction: action.payload.direction,
        });

        state.votes = votes;
      },
    },
    addVoteSuccess: {
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

        const vote = state.votes.find(
          ({ id, imageId }) => !id && imageId === action.payload.imageId
        );

        if (vote) {
          vote.id = action.payload.id;
        }
      },
    },
    addVoteFailure: {
      prepare: (imageId: string) => ({
        payload: imageId,
      }),
      reducer: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.votes = state.votes.filter(
          ({ imageId, isCurrentUser }) =>
            imageId !== action.payload || !isCurrentUser
        );
      },
    },

    deleteVote: {
      prepare: (id: number) => ({
        payload: id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.loading = true;

        const vote = state.votes.find(({ id }) => id === action.payload);

        if (vote) {
          vote.toDelete = true;
        }
      },
    },
    deleteVoteSuccess: {
      prepare: (id: number) => ({
        payload: id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.votes = state.votes.filter(
          ({ id, isCurrentUser }) => id !== action.payload || !isCurrentUser
        );
      },
    },
    deleteVoteFailure: {
      prepare: (id: number) => ({
        payload: id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.loading = false;

        const vote = state.votes.find(({ id }) => id === action.payload);

        if (vote) {
          vote.toDelete = false;
        }
      },
    },
  },
});

export const votesActions = votesSlice.actions;
export const votesReducer = votesSlice.reducer;
