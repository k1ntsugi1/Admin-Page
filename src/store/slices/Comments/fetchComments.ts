import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { actionsNotification } from '../uiNotificationSlice';

import { urls } from '../../../utils/constants';

import { IThunkAPI } from '../interfaces';

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface IResponse {
  comments: IComment[];
}

export interface IClientParams {
  method: 'get' | 'post' | 'patch';
  postId: string | number;
  values?: {
    postId: string | number;
    name: string;
    email: string;
    body: string;
    id?: string | number;
  };
}

export const fetchComments = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchComments',
  async (clientParams, thunkAPI) => {
    try {
      const { method, postId, values } = clientParams;

      const url = method === 'patch' ? urls.comments.all() :urls.comments.byPostId(postId);

      const { data } = await axios[method]<IComment[] | IComment>(url, values);
      
      if (method !== 'get') {
        thunkAPI.dispatch(actionsNotification.show({ message: 'Сохранено', type: 'success' }));
      }

      return { comments: Array.isArray(data) ? data : [data]};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
