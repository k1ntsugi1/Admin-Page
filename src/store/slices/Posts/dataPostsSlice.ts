import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost, fetchPosts } from './fetchPosts';
import { LoadingStatuses } from '../../../utils/constants';
import { RootState } from '../../index';

interface IInitialState {
  activePostId: string | number | null;
  statusOfLoading: string;
  typeOfError: string;
}

const initialState: IInitialState = {
  activePostId: null,
  statusOfLoading: 'idl',
  typeOfError: ''
};

const postsEntityAdapter = createEntityAdapter<IPost>();

const dataPostsSlice = createSlice({
  name: 'posts',
  initialState: postsEntityAdapter.getInitialState(initialState),
  reducers: {
    setActivePostId(state, action:PayloadAction<{ id: number | string | null }>) {
      state.activePostId = action.payload.id;
    },
    updatePost(state, action:PayloadAction<{post: IPost }>) {
      postsEntityAdapter.upsertOne(state, action.payload.post);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.statusOfLoading = LoadingStatuses.pending;
        state.typeOfError = '';
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        const { posts } = payload;
        console.log(posts)
        state.statusOfLoading = LoadingStatuses.fulfilled;
        postsEntityAdapter.upsertMany(state, posts);
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      });
  }
});

export const selectorsPosts = postsEntityAdapter.getSelectors<RootState>(
  (store) => store.dataPosts
);

export const actionsPosts = dataPostsSlice.actions;

export default dataPostsSlice.reducer;
