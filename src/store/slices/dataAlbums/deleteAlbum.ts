import axios, {AxiosError} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

import { urls } from '../../../utils/constants';
import { actionsNotification } from '../uiNotification/uiNotificationSlice';

export const deleteAlbum = createAsyncThunk(
  'deleteAlbum',
  async (itemId: number, thunkAPI) => {
    try {
      const url = urls.albums.byAlbumId(itemId);
      await axios.delete(url);
      thunkAPI.dispatch(actionsNotification.show({ message: 'Удалено', type: 'error' }));
      return { itemId };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);

export type TDeleteAlbum = typeof deleteAlbum;