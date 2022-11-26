import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchTodos, ITodo } from './fetchTodos';
import { deleteTask } from './deleteTask';

import { LoadingStatuses } from '../../../constants/LoadingStatuses';

import { RootState } from '../../index';

interface IInitialState {
  statusOfLoading: string;
  errorMessage: string;
  allTodosAreLoaded: boolean;
  userIdsWithLoadedTodos: number[];
}

const initialState: IInitialState = {
  allTodosAreLoaded: false,
  userIdsWithLoadedTodos: [],
  statusOfLoading: LoadingStatuses.idle,
  errorMessage: ''
};

const todosEntityAdapter = createEntityAdapter<ITodo>();

const dataTodosSlice = createSlice({
  name: 'todos',
  initialState: todosEntityAdapter.getInitialState(initialState),
  reducers: {
    updateUserIdsWithLoadedTodos(state, action: PayloadAction<{ ids: number[] }>) {
      state.userIdsWithLoadedTodos = [...state.userIdsWithLoadedTodos, ...action.payload.ids];
    },
    setAllTodosAreLoaded(state) {
      state.allTodosAreLoaded = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, { meta }) => {
        if (meta.arg.method === 'get') state.statusOfLoading = LoadingStatuses.pending;
        state.errorMessage = '';
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        const { todos } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        todosEntityAdapter.upsertMany(state, todos);
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        if (!payload) return;
        const { message } = payload;
        state.statusOfLoading = LoadingStatuses.rejected;
        state.errorMessage = message;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        const { itemId } = payload;
        todosEntityAdapter.removeOne(state, itemId);
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        if (!payload) return;
        const { message } = payload;
        state.statusOfLoading = LoadingStatuses.rejected;
        state.errorMessage = message;
      });
  }
});

export const selectorsTodos = todosEntityAdapter.getSelectors<RootState>(
  (store) => store.dataTodos
);

export const actionsTodos = dataTodosSlice.actions;

export default dataTodosSlice.reducer;
