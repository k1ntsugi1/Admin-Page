import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchAlbums, IAlbum } from './fetchAlbums';
import { deleteAlbum } from './deleteAlbum';
import { LoadingStatuses } from '../../../utils/constants';

import { RootState } from '../../index';

interface IInitialState {
  allAlbumsAreLoaded: boolean;
  userIdsWithLoadedAlbums: number[];
  activeAlbumId: number | null;
  statusOfLoading: string;
  typeOfError: string;
}

const initialState: IInitialState = {
  allAlbumsAreLoaded: false,
  userIdsWithLoadedAlbums: [],
  activeAlbumId: null,
  statusOfLoading: LoadingStatuses.idle,
  typeOfError: ''
};

const albumsEntityAdapter = createEntityAdapter<IAlbum>();

const dataAlbumsSlice = createSlice({
  name: 'albums',
  initialState: albumsEntityAdapter.getInitialState(initialState),
  reducers: {
    setActiveAlbumId(state, action: PayloadAction<{ id: number | null }>) {
      state.activeAlbumId = action.payload.id;
    },
    updateUserIdsWithLoadedAlbums(state, action: PayloadAction<{ ids: number[] }>) {
      state.userIdsWithLoadedAlbums = [...state.userIdsWithLoadedAlbums, ...action.payload.ids];
    },
    setAllAlbumsAreLoaded(state) {
      state.allAlbumsAreLoaded = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.statusOfLoading = LoadingStatuses.pending;
        state.typeOfError = '';
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        const { albums, method } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        albumsEntityAdapter.upsertMany(state, albums);
        if (method === 'post') {
          const newAlbum = albums[0];
          state.activeAlbumId = newAlbum.id;
        }
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      })
      .addCase(deleteAlbum.fulfilled, (state, { payload }) => {
        const { itemId } = payload;
        albumsEntityAdapter.removeOne(state, itemId);
      })
      .addCase(deleteAlbum.rejected, (state, { payload }) => {
        // state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      });
  }
});

export const selectorsAlbums = albumsEntityAdapter.getSelectors<RootState>(
  (store) => store.dataAlbums
);

export const actionsAlbums = dataAlbumsSlice.actions;

export default dataAlbumsSlice.reducer;
