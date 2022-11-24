import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { urls } from '../../../utils/constants';
import { actionsNotification } from '../uiNotificationSlice';

export const deleteComment = createAsyncThunk(
  'deleteComment',
  async (itemId: number, thunkAPI) => {
    try {
      const url = urls.comments.byCommentId(itemId);
      await axios.delete(url);
      thunkAPI.dispatch(actionsNotification.show({ message: 'Удалено', type: 'error' }));
      return { itemId };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);

export type TDeleteComment = typeof deleteComment;