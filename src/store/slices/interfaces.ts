import { RootState, AppDispatch } from '../index';

export interface IThunkAPI {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: {
    message: string;
  };
}


export type TClientParamsForDeleteItem = number

export interface ISuccessOfDeleteItem {
  itemId: number
}
