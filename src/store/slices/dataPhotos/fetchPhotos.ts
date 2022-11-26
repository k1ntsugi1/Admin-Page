import axios, {AxiosError} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { URLS } from '../../../constants/URLS';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

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

      const { PHOTOS: URLS_OF_PHOTOS } = URLS;
      const url = method === 'post' ? URLS_OF_PHOTOS.ALL() : URLS_OF_PHOTOS.BY_ALBUM_ID(albumId);

      const { data } = await axios[method]<IPhoto[] | IPostedPatchedPhoto>(
        url,
        values ? values : {}
      );

      return { photos: Array.isArray(data) ? data : [{...data[0], id: data.id}] };
    } catch (err) {
      const error = err as AxiosError | Error
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);
