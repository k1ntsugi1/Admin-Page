import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IThunkAPI } from '../interfaces';

import { urls } from '../../../utils/constants';
import { actionsPosts } from './dataPostsSlice';
import { actionsNotification } from '../uiNotificationSlice';

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
      const { posts: urlsOfPosts } = urls;

      const url = userId
        ? urlsOfPosts.byUserId(userId)
        : !postId
        ? urlsOfPosts.all()
        : urlsOfPosts.byPostId(postId);

      const { data } = await axios[method]<IPost[] | IPost>(url, values);

      const preparedData = Array.isArray(data) ? data : [data];

      if (method !== 'get') {
        dispatch(actionsNotification.show({ message: 'Сохранено', type: 'success' }));
      }

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
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
