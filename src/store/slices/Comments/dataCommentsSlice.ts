import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../index';

import { fetchComments, IComment } from './fetchComments';
import { deletePost } from '../Posts/deletePost';
import { deleteComment } from './deleteComment';

import { LoadingStatuses } from '../../../utils/constants';

interface IInitialState {
  methodOfFetch: 'get' | 'post' | 'patch' | 'idl';
  postIdsOfLoadedComments: (string | number)[];
  statusOfLoading: string;
  typeOfError: string;
}

const initialState: IInitialState = {
  methodOfFetch: 'idl',
  postIdsOfLoadedComments: [],
  statusOfLoading: LoadingStatuses.idle,
  typeOfError: ''
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
        state.typeOfError = '';
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        const { comments } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        commentsEntityAdapter.upsertMany(state, comments);
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
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
