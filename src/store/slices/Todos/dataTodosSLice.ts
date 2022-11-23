import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchTodos, ITodo } from './fetchTodos';

import { LoadingStatuses } from '../../../utils/constants';

import { RootState } from '../../index';

interface IInitialState {
  statusOfLoading: string;
  typeOfError: string;
}

const initialState: IInitialState = {
  statusOfLoading: LoadingStatuses.idle,
  typeOfError: ''
};

const todosEntityAdapter = createEntityAdapter<ITodo>();

const dataTodosSlice = createSlice({
  name: 'posts',
  initialState: todosEntityAdapter.getInitialState(initialState),
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.statusOfLoading = LoadingStatuses.pending;
        state.typeOfError = '';
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        const { todos } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        todosEntityAdapter.upsertMany(state, todos);
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      })
  }
});

export const selectorsTodos = todosEntityAdapter.getSelectors<RootState>(
  (store) => store.dataTodos
);

export const actionsTodos = dataTodosSlice.actions;

export default dataTodosSlice.reducer;