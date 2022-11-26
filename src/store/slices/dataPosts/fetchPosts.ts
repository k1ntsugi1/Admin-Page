import axios, {AxiosError} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IThunkAPI } from '../interfaces';

import { URLS } from '../../../constants/URLS';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

import { actionsPosts } from './dataPostsSlice';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IResponse {
  posts: IPost[];
  method: 'get' | 'post' | 'patch';
}

export interface IClientParams {
  method: 'get' | 'post' | 'patch';
  postId?: number | null;
  values?: {
    title: string;
    body: string;
    userId: number;
    id?: number;
  };
}

export const fetchPosts = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchPosts',
  async (clientParams, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const dispatch = thunkAPI.dispatch;
      const { userIdsWithLoadedPosts } = state.dataPosts;
      const { userId } = state.dataUser;
      const { method, postId, values } = clientParams;
      const { POSTS: URLS_OF_POSTS } = URLS;

      const url = userId && method === 'get'
        ? URLS_OF_POSTS.BY_USER_ID(userId)
        : !postId
        ? URLS_OF_POSTS.ALL()
        : URLS_OF_POSTS.BY_POST_ID(postId);

      const { data } = await axios[method]<IPost[] | IPost>(url, values);

      const preparedData = Array.isArray(data) ? data : [data];

      if (userId && method === 'get') {
        dispatch(actionsPosts.updateUserIdsWithLoadedPosts({ ids: [userId] }));
      }

      if (!userId && method === 'get') {
        const userIds = preparedData
          .map((post) => post.userId)
          .filter((id) => !userIdsWithLoadedPosts.includes(id));
          dispatch(actionsPosts.updateUserIdsWithLoadedPosts({ ids: userIds }));
          dispatch(actionsPosts.setAllPostsAreLoaded());
      }

      return { posts: preparedData, method };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);
