import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

import { URLS } from '../../../constants/URLS';

import { actionsNotification } from '../uiNotification/uiNotificationSlice';

import { TClientParamsForDeleteItem, IThunkAPI, ISuccessOfDeleteItem } from '../interfaces';

export const deletePhoto = createAsyncThunk<ISuccessOfDeleteItem, TClientParamsForDeleteItem, IThunkAPI>(
  'deletePhoto',
  async (itemId: number, thunkAPI) => {
    try {
      const url = URLS.PHOTOS.BY_PHOTO_ID(itemId);
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