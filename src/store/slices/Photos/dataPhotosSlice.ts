import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../index';

import { fetchPhotos, IPhoto } from './fetchPhotos';

import { LoadingStatuses } from '../../../utils/constants';

interface IInitialState {
  albumsIdsOfLoadedComments: number[];
  statusOfLoading: string;
  typeOfError: string;
}

const initialState: IInitialState = {
  albumsIdsOfLoadedComments: [],
  statusOfLoading: LoadingStatuses.idle,
  typeOfError: ''
};

const photosEntityAdapter = createEntityAdapter<IPhoto>();

const dataPhotosSlice = createSlice({
  name: 'comments',
  initialState: photosEntityAdapter.getInitialState(initialState),
  reducers: {
    addAlbumId: (state, action: PayloadAction<{ id: number }>) => {
      state.albumsIdsOfLoadedComments.push(action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state, { meta }) => {
        state.statusOfLoading = LoadingStatuses.pending;
        state.typeOfError = '';
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        const { photos } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        photosEntityAdapter.upsertMany(state, photos);
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      });
  }
});

export const selectorsPhotos = photosEntityAdapter.getSelectors<RootState>(
  (store) => store.dataPhotos
);

export const actionsPhotos = dataPhotosSlice.actions;

export default dataPhotosSlice.reducer;
