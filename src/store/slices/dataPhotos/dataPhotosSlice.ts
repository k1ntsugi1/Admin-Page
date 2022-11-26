import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../index';

import { fetchPhotos, IPhoto } from './fetchPhotos';
import { deleteAlbum } from '../dataAlbums/deleteAlbum';
import { deletePhoto } from './deletePhoto';

import { LoadingStatuses } from '../../../utils/constants';

interface IInitialState {
  albumsIdsOfLoadedComments: number[];
  statusOfLoading: string;
  errorMessage: string;
}

const initialState: IInitialState = {
  albumsIdsOfLoadedComments: [],
  statusOfLoading: LoadingStatuses.idle,
  errorMessage: ''
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
        state.errorMessage = '';
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        const { photos } = payload;
        state.statusOfLoading = LoadingStatuses.fulfilled;
        photosEntityAdapter.upsertMany(state, photos);
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        if (!payload) return;
        const { message } = payload;
        state.statusOfLoading = LoadingStatuses.rejected;
        state.errorMessage = message;
      })
      .addCase(deleteAlbum.fulfilled, (state, { payload }) => {
        const { itemId } = payload;

        if (!state.entities) return;

        const arrayOfEntities = Object.values(state.entities ?? {});
        if (arrayOfEntities.length === 0) return;

        arrayOfEntities.forEach((photo) => {
          if (!photo) return ;
          if (photo.albumId === itemId) {
            photosEntityAdapter.removeOne(state, photo.id)
          }
          
        });
      })
      .addCase(deletePhoto.pending, (state, { payload }) => {
        // state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        const { itemId } = payload;
        photosEntityAdapter.removeOne(state, itemId);
      })
      .addCase(deletePhoto.rejected, (state, { payload }) => {
        // state.statusOfLoading = LoadingStatuses.rejected;
        // state.typeOfError = typeOfError;
      });
  }
});

export const selectorsPhotos = photosEntityAdapter.getSelectors<RootState>(
  (store) => store.dataPhotos
);

export const actionsPhotos = dataPhotosSlice.actions;

export default dataPhotosSlice.reducer;
