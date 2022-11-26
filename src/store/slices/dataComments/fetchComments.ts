import axios, {AxiosError} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { URLS } from '../../../constants/URLS';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

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
      const { COMMENTS: URLS_OF_COMMENTS } = URLS;
      const url =
        method === 'post'
          ? URLS_OF_COMMENTS.ALL()
          : values && values.id
          ? URLS_OF_COMMENTS.BY_COMMENT_ID(values.id)
          : URLS_OF_COMMENTS.BY_POST_ID(postId);

      const { data } = await axios[method]<IComment[] | IComment>(url, values);

      return { comments: Array.isArray(data) ? data : [data] };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);
