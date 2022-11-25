import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { actionsAlbums } from './dataAlbumsSlice';
import { actionsNotification } from '../uiNotification/uiNotificationSlice';
import { fetchPhotos } from '../dataPhotos/fetchPhotos';

import { IThunkAPI } from '../interfaces';

import { urls } from '../../../utils/constants';

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IResponse {
  albums: IAlbum[];
  method: 'get' | 'post' | 'patch';
}

interface IValuesOfPhotos {
  title: string;
  url: string;
  thumbnailUrl: string;
  id?: number;
}

export interface IClientParams {
  method: 'get' | 'post' | 'patch';
  albumId?: number;
  valuesOfAlbum?: {
    title: string;
    userId: number;
    id?: number;
  };
  valuesOfPhotos?: IValuesOfPhotos[];
}

export const fetchAlbums = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchAlbums',
  async (clientParams, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const dispatch = thunkAPI.dispatch;
      const { userIdsWithLoadedAlbums } = state.dataAlbums;
      const { userId } = state.dataUser;
      const { method, albumId, valuesOfAlbum, valuesOfPhotos } = clientParams;
      const { albums: urlsOfAlbums } = urls;

      const url =
        userId && method === 'get'
          ? urlsOfAlbums.byUserId(userId)
          : !albumId
          ? urlsOfAlbums.all()
          : urlsOfAlbums.byAlbumId(albumId);

      const { data } = await axios[method]<IAlbum | IAlbum[]>(url, valuesOfAlbum);

      const preparedData = Array.isArray(data) ? data : [data];

      if (method !== 'get') {
        dispatch(actionsNotification.show({ message: 'Альбом Сохранен', type: 'success' }));

        if (valuesOfPhotos === undefined) {
          return { albums: Array.isArray(data) ? data : [data], method };
        }

        const albumId = preparedData[0].id

        const photosWithAlbumId = valuesOfPhotos.map((photo) => ({
          title: photo.title,
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
          albumId,
        }));
        await dispatch(
          fetchPhotos({ method: 'post', albumId, values: photosWithAlbumId })
        );
      }

      if (userId && method === 'get') {
        dispatch(actionsAlbums.updateUserIdsWithLoadedAlbums({ ids: [userId] }));
      }

      if (!userId && method === 'get') {
        const userIds = preparedData
          .map((album) => album.userId)
          .filter((id) => !userIdsWithLoadedAlbums.includes(id));
        dispatch(actionsAlbums.updateUserIdsWithLoadedAlbums({ ids: userIds }));
        dispatch(actionsAlbums.setAllAlbumsAreLoaded());
      }

      return { albums: preparedData, method };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
