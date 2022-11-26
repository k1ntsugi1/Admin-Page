import axios, {AxiosError} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

import { URLS } from '../../../constants/URLS';


import { TClientParamsForDeleteItem, IThunkAPI, ISuccessOfDeleteItem } from '../interfaces';

export const deleteComment = createAsyncThunk<ISuccessOfDeleteItem, TClientParamsForDeleteItem, IThunkAPI>(
  'deleteComment',
  async (itemId: number, thunkAPI) => {
    try {
      const url = URLS.COMMENTS.BY_COMMENT_ID(itemId);
      await axios.delete(url);
      return { itemId };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);

export type TDeleteComment = typeof deleteComment;