import { AxiosError } from 'axios';
import { RootState, AppDispatch } from '../index';

// export interface IErrorRequest {
//   response?: string; // ошибка сервера 4хх/5хх
//   request?: string; // ошибка сети
// }

export interface IThunkAPI {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: {
      message: string
    };
  }