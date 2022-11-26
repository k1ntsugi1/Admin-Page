import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../index';

import { fetchComments, IComment } from './fetchComments';
import { deletePost } from '../dataPosts/deletePost';
import { deleteComment } from './deleteComment';

import { LoadingStatuses } from '../../../utils/constants';

interface IInitialState {
  methodOfFetch: 'get' | 'post' | 'patch' | 'idl';
  postIdsOfLoadedComments: (string | number)[];
  statusOfLoading: string;
  errorMessage: string;
}

const initialState: IInitialState = {
  methodOfFetch: 'idl',
  postIdsOfLoadedComments: [],
  statusOfLoading: LoadingStatuses.idle,
  errorMessage: ''
};

const commentsEntityAdapter = createEntityAdapter<IComment>();

const dataCommentsSlice = createSlice({
  name: 'comments',
  initialState: commentsEntityAdapter.getInitialState(initialState),
  reducers: {
    addPostId: (state, action: PayloadAction<{ id: string | number }>) => {
      state.postIdsOfLoadedComments.push(action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, { meta }) => {
        state.methodOfFetch = meta.arg.method;
        state.statusOfLoading = LoadingStatuses.pending;
        state.errorMessage = '';
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        const { comments } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        commentsEntityAdapter.upsertMany(state, comments);
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        if (!payload) return;
        const { message } = payload;
        state.statusOfLoading = LoadingStatuses.rejected;
        state.errorMessage = message;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        const { itemId } = payload;

        if (!state.entities) return;

        const arrayOfEntities = Object.values(state.entities ?? {});
        if (arrayOfEntities.length === 0) return;

        arrayOfEntities.forEach((comment) => {
          if (!comment) return;
          if (comment.postId === itemId) {
            commentsEntityAdapter.removeOne(state, comment.id);
          }
        });
      })
      .addCase(deleteComment.pending, (state, { payload }) => {
        // state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        const { itemId } = payload;
        commentsEntityAdapter.removeOne(state, itemId);
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        // state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      });
  }
});

export const selectorsComments = commentsEntityAdapter.getSelectors<RootState>(
  (store) => store.dataComments
);

export const actionsComments = dataCommentsSlice.actions;

export default dataCommentsSlice.reducer;
