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

export const fetchAlbums = createAsyncThunk<IResponse, void, IThunkAPI>(
  'fetchAlbums',
  async (_, thunkAPI) => {
    try {
      const url = urls.albums.all();

      const { data } = await axios.get<IAlbum[]>(url);

      return { albums: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
