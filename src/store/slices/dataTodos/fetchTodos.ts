import axios, {AxiosError} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

import { actionsNotification } from '../uiNotification/uiNotificationSlice';
import { actionsTodos } from './dataTodosSLice';
import { IThunkAPI } from '../interfaces';

import { urls } from '../../../utils/constants';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IResponse {
  todos: ITodo[];
}

export interface IClientParams {
  method: 'get' | 'post' | 'patch';
  values?: {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
  };
}

export const fetchTodos = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchTodos',
  async (clientParams, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const dispatch = thunkAPI.dispatch;
      const { userIdsWithLoadedTodos } = state.dataTodos;
      const { method, values } = clientParams;
      const { userId } = state.dataUser;

      const url =
        userId && method === 'get'
          ? urls.todos.byUserId(userId)
          : values && values.id
          ? urls.todos.byTodoId(values.id)
          : urls.todos.all();

      const { data } = await axios[method]<ITodo[] | ITodo>(url, values ? values : {});
      const preparedData = Array.isArray(data) ? data : [data];

      if (method !== 'get') {
        dispatch(actionsNotification.show({ message: 'Сохранено', type: 'success' }));
      }

      if (userId && method === 'get') {
        dispatch(actionsTodos.updateUserIdsWithLoadedTodos({ ids: [userId] }));
      }

      if (!userId && method === 'get') {
        const userIds = preparedData
          .map((task) => task.userId)
          .filter((id) => !userIdsWithLoadedTodos.includes(id));
        dispatch(actionsTodos.updateUserIdsWithLoadedTodos({ ids: userIds }));
        dispatch(actionsTodos.setAllTodosAreLoaded());
      }

      return { todos: preparedData };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);
