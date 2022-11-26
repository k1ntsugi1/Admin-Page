import axios, {AxiosError} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { actionsNotification } from '../uiNotification/uiNotificationSlice';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';
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
  postId: number;
  values?: {
    postId: number;
    name: string;
    email: string;
    body: string;
    id?: number;
  };
}

export const fetchComments = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchComments',
  async (clientParams, thunkAPI) => {
    try {
      const { method, postId, values } = clientParams;
      const { comments: urlsOfComments } = urls;
      const url =
        method === 'post'
          ? urlsOfComments.all()
          : values && values.id
          ? urlsOfComments.byCommentId(values.id)
          : urlsOfComments.byPostId(postId);

      const { data } = await axios[method]<IComment[] | IComment>(url, values);

      if (method !== 'get') {
        thunkAPI.dispatch(actionsNotification.show({ message: 'Сохранено', type: 'success' }));
      }

      return { comments: Array.isArray(data) ? data : [data] };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);
