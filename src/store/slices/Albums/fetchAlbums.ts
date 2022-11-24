import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { actionsAlbums } from './dataAlbumsSlice';

import { IThunkAPI } from '../interfaces';

import { urls } from '../../../utils/constants';

export interface IAlbum {
  userId: number;
  id: number;
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
      const state = thunkAPI.getState();
      const dispatch = thunkAPI.dispatch;
      const { userIdsWithLoadedAlbums } = state.dataAlbums;
      const { userId } = state.dataUser;
      const { method, albumId } = clientParams;
      const { albums: urlsOfAlbums } = urls;
      const url = userId
        ? urlsOfAlbums.byUserId(userId)
        : !albumId
        ? urlsOfAlbums.all()
        : urlsOfAlbums.byAlbumId(albumId);

      const { data } = await axios[method]<IAlbum | IAlbum[]>(url);

      const preparedData = Array.isArray(data) ? data : [data];

      if (userId) {
        dispatch(actionsAlbums.updateUserIdsWithLoadedAlbums({ ids: [userId] }));
      }

      if (!userId && method === 'get') {
        const userIds = preparedData
          .map((album) => album.userId)
          .filter((id) => !userIdsWithLoadedAlbums.includes(id));
        dispatch(actionsAlbums.updateUserIdsWithLoadedAlbums({ ids: userIds }));
        dispatch(actionsAlbums.setAllAlbumsAreLoaded());
      }

      return { albums: Array.isArray(data) ? data : [data] };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'serverError' });
    }
  }
);
