import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IThunkAPI } from '../interfaces';

import { urls } from '../../../utils/constants';

export interface IAlbum {
  userId: number | null;
  id: number | null;
  title: string;
}

export interface IResponse {
  albums: IAlbum[];
}

export interface IClientParams {
  method: 'get';
  albumId?: number;
}

export const fetchAlbums = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchAlbums',
  async (clientParams, thunkAPI) => {
    try {

      const { method, albumId } = clientParams;

      const url = !albumId ? urls.albums.all() : urls.albums.byAlbumId(albumId);

      const { data } = await axios[method]<IAlbum | IAlbum[]>(url);

      return { albums: Array.isArray(data) ? data : [data] };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
