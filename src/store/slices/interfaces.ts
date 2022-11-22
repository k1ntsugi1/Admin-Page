import { RootState, AppDispatch } from '../index';
export interface IThunkAPI {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: {
      error: string;
    };
  }