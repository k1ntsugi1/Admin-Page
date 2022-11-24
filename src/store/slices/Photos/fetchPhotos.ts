import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { urls } from '../../../utils/constants';
import { actionsNotification } from '../uiNotificationSlice';

import { IThunkAPI } from '../interfaces';

interface IPostedPatchedPhoto {
  0: {
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  };
  id: number;
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IResponse {
  photos: IPhoto[];
}

interface IValuesOfPhotos {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IClientParams {
  method: 'get' | 'post' | 'patch';
  albumId: number;
  values?: IValuesOfPhotos[];
}

export const fetchPhotos = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchPhotos',
  async (clientParams, thunkAPI) => {
    try {
      const { method, albumId, values } = clientParams;

      const { photos: urlsOfPhotos } = urls;
      const url = method === 'post' ? urlsOfPhotos.all() : urlsOfPhotos.byAlbumId(albumId);

      const { data } = await axios[method]<IPhoto[] | IPostedPatchedPhoto>(
        url,
        values ? values : {}
      );

      if (method !== 'get') {
        thunkAPI.dispatch(actionsNotification.show({ message: 'Фото Сохранены', type: 'success' }));
      }

      return { photos: Array.isArray(data) ? data : [{...data[0], id: data.id}] };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
