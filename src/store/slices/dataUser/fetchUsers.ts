import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IThunkAPI } from '../interfaces';

import { URLS } from '../../../constants/URLS';

import { errorOfAsyncThunkHandler } from '../../../utils/errorOfAsyncThunkHandler';

interface IClientParams {
  method: 'get';
  userId: number;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IResponse {
    users: IUser[],
}

export const fetchUsers = createAsyncThunk<IResponse, IClientParams, IThunkAPI>(
  'fetchUser',
  async (clientParams, thunkAPI) => {
    try {
      const { userId, method } = clientParams;
      const { USERS: URLS_OF_USERS } = URLS;
      const url = URLS_OF_USERS.BY_USER_ID(userId);

      const { data } = await axios[method]<IUser | IUser[]>(url);
      return { users: Array.isArray(data) ? data : [data] };
    } catch (err) {
      const error = err as AxiosError | Error;
      return thunkAPI.rejectWithValue(errorOfAsyncThunkHandler(error));
    }
  }
);
