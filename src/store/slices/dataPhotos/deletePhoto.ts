import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

import { urls } from '../../../utils/constants';
import { actionsNotification } from '../uiNotification/uiNotificationSlice';

export const deletePhoto = createAsyncThunk(
  'deletePhoto',
  async (itemId: number, thunkAPI) => {
    try {
      const url = urls.photos.byPhotoId(itemId);
      await axios.delete(url);
      thunkAPI.dispatch(actionsNotification.show({ message: 'Удалено', type: 'error' }));
      return { itemId };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);

export type TDeletePhoto = typeof deletePhoto