import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../index';

import { fetchGetComments, IComment } from './fetchGetComments';

import { LoadingStatuses } from '../../../utils/constants';

interface IInitialState {
  postIdsOfLoadedComments: (string | number)[]
  statusOfLoading: string;
  typeOfError: string;
}

const initialState: IInitialState = {
  postIdsOfLoadedComments: [],
  statusOfLoading: 'idl',
  typeOfError: ''
};

const commentsEntityAdapter = createEntityAdapter<IComment>();

const dataCommentsSlice = createSlice({
  name: 'comments',
  initialState: commentsEntityAdapter.getInitialState(initialState),
  reducers: {
    addPostId: (state, action:PayloadAction<{id: string | number}>) => {
      state.postIdsOfLoadedComments.push(action.payload.id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetComments.pending, (state) => {
        state.statusOfLoading = LoadingStatuses.pending;
        state.typeOfError = '';
      })
      .addCase(fetchGetComments.fulfilled, (state, { payload }) => {
        const { comments } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        commentsEntityAdapter.upsertMany(state, comments);
      })
      .addCase(fetchGetComments.rejected, (state, { payload }) => {
        state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      });
  }
});

export const selectorsComments = commentsEntityAdapter.getSelectors<RootState>((store) => store.dataComments);

export const actionsComments = dataCommentsSlice.actions;

export default dataCommentsSlice.reducer;
