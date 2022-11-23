import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
  method: 'get';
}

export const fetchTodos = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchTodos',
  async (clientParams, thunkAPI) => {
    try {

      const { method } = clientParams;

      const url = urls.todos.all();

      const { data } = await axios[method]<ITodo[]>(url);


      return { todos: data};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);