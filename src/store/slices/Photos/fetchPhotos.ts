import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { urls } from '../../../utils/constants';

import { IThunkAPI } from '../interfaces';

export interface IPhoto {
    albumId: 1,
    id: 1,
    title: string,
    url: string,
    thumbnailUrl: string,
}

interface IResponse {
  photos: IPhoto[];
}

export interface IClientParams {
  method: 'get';
  albumId: number;
}

export const fetchPhotos = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchPhotos',
  async (clientParams, thunkAPI) => {
    try {
      const { method, albumId } = clientParams;

      const url =  urls.photos.byAlbumId(albumId);

      const { data } = await axios[method]<IPhoto[]>(url);
      

      return { photos: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);