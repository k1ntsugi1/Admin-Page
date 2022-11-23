import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchAlbums, IAlbum } from './fetchAlbums';

import { LoadingStatuses } from '../../../utils/constants';

import { RootState } from '../../index';

interface IInitialState {
    statusOfLoading: string;
    typeOfError: string;
}

const initialState: IInitialState = {
    statusOfLoading: 'idl',
    typeOfError: ''
};

const albumsEntityAdapter = createEntityAdapter<IAlbum>();

const dataAlbumsSlice = createSlice({
  name: 'albums',
  initialState: albumsEntityAdapter.getInitialState(initialState),
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.statusOfLoading = LoadingStatuses.pending;
        state.typeOfError = '';
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        const { albums } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        albumsEntityAdapter.upsertMany(state, albums);
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      })
  }
});

export const selectorsAlbums = albumsEntityAdapter.getSelectors<RootState>(
  (store) => store.dataAlbums
);

export const actionsAlbums = dataAlbumsSlice.actions;

export default dataAlbumsSlice.reducer;
