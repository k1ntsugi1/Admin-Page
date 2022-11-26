import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchUsers, IUser } from './fetchUsers';

import { LoadingStatuses } from '../../../constants/LoadingStatuses';

import { RootState } from '../../index';

interface IInitialState {
  statusOfLoading: string;
  errorMessage: string;
  userId: number | null;
  previouesUserId: number | null;
}

const initialState: IInitialState = {
  statusOfLoading: LoadingStatuses.idle,
  errorMessage: '',
  userId: null,
  previouesUserId: null
};

const userEntityAdapter = createEntityAdapter<IUser>();

const dataUserSlice = createSlice({
  name: 'users',
  initialState: userEntityAdapter.getInitialState(initialState),
  reducers: {
    setUserId(state, action: PayloadAction<{ id: number | null }>) {
      state.previouesUserId = state.userId;
      state.userId = action.payload.id;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.statusOfLoading = LoadingStatuses.pending;
        state.errorMessage = '';
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        const { users } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        userEntityAdapter.upsertMany(state, users);
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        if (!payload) return;
        const { message } = payload;
        state.statusOfLoading = LoadingStatuses.rejected;
        state.errorMessage = message;
      })
  }
});

export const selectorsUsers = userEntityAdapter.getSelectors<RootState>(
  (store) => store.dataUser
);

export const actionsUser = dataUserSlice.actions;

export default dataUserSlice.reducer;
