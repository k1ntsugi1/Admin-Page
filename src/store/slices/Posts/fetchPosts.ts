import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IThunkAPI } from '../interfaces';

import { urls } from '../../../utils/constants';
import { actionsNotification } from '../uiNotificationSlice';
import { actionsPosts } from './dataPostsSlice';

export interface IPost {
  userId: string | number;
  id: string | number;
  title: string;
  body: string;
}

export interface IResponse {
  posts: IPost[];
  method: 'get' | 'post' | 'put';
}

export interface IClientParams {
  method: 'get' | 'post' | 'put';
  postId?: string | number | null;
  values?: {
    title: string;
    body: string;
    userId: string | number;
    id?: string | number;
  };
}

export const fetchPosts = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchPosts',
  async (clientParams, thunkAPI) => {
    try {

      const { method, postId, values } = clientParams;

      const url = !postId ? urls.posts.all() : urls.posts.byPostId(postId);

      const { data } = await axios[method]<IPost[] | IPost>(url, values);

      if (method !== 'get') {
        thunkAPI.dispatch(actionsNotification.show({ message: 'Сохранено', type: 'success' }));
      }

      return { posts: Array.isArray(data) ? data : [data], method};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
