import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { urls } from '../../../utils/constants';
import { actionsNotification } from '../uiNotification/uiNotificationSlice';

export const deletePost = createAsyncThunk(
  'deletePost',
  async (itemId: number, thunkAPI) => {
    try {
      const url = urls.posts.byPostId(itemId);
      await axios.delete(url);
      thunkAPI.dispatch(actionsNotification.show({ message: 'Удалено', type: 'error' }));
      return { itemId };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);

export type TDeletePost = typeof deletePost
