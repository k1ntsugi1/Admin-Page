import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

import { URLS } from '../../../constants/URLS';

import { actionsNotification } from '../uiNotification/uiNotificationSlice';

import { TClientParamsForDeleteItem, IThunkAPI, ISuccessOfDeleteItem } from '../interfaces';

export const deleteTask = createAsyncThunk<ISuccessOfDeleteItem, TClientParamsForDeleteItem, IThunkAPI>(
  'deleteTask',
  async (itemId: number, thunkAPI) => {
    try {
      const url = URLS.TODOS.BY_TODO_ID(itemId);
      await axios.delete(url);
      thunkAPI.dispatch(actionsNotification.show({ message: 'Удалено', type: 'error' }));
      return { itemId };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);

export type TDeleteTask = typeof deleteTask