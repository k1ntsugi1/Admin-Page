import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface IInitialState {
  message: string;
  type: string;
  statusOfVisibility: string;
}

const initialState: IInitialState = {
  message: '',
  type: 'success',
  statusOfVisibility: 'hidden'
};

const uiNotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show(state, action: PayloadAction<{ [key: string]: string }>) {
      uiNotificationSlice.caseReducers.hide(state);
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
      state.statusOfVisibility = 'visible';
    },
    hide(state) {
      state.statusOfVisibility = 'unvisible';
    }
  }
});

export const actionsNotification = uiNotificationSlice.actions;

export default uiNotificationSlice.reducer;