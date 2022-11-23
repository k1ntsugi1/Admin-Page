import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { urls } from '../../../utils/constants';
import { actionsNotification } from '../uiNotificationSlice';

export const deletePost = createAsyncThunk('deletePost', async (postId: string | number, thunkAPI) => {
  try {
    const url =  urls.posts.delete(postId);
    await axios.delete(url);
    thunkAPI.dispatch(actionsNotification.show({ message: 'Удалено', type: 'error' }));
    return { postId };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'serverError' });
  }
});
