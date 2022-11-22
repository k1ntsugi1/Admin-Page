import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IThunkAPI } from '../interfaces';

import { urls } from '../../../utils/constants';

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

export const fetchGetComments = createAsyncThunk<IResponse, string | number, IThunkAPI>(
  'fetchComments',
  async (postId, thunkAPI) => {
    try {
      const url = urls.comments.byPostId(postId);
      const { data } = await axios.get<IComment[]>(url);
      
      return { comments: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
