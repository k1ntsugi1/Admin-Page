import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const fetchGetComments = createAsyncThunk<IResponse, string | number, IThunkAPI>(
  'fetchComments',
  async (postId, thunkAPI) => {
    try {
      const { data } = await axios.get<IComment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return { comments: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
