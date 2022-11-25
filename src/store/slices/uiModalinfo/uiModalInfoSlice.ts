import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  message: string;
  show: boolean;
}

const initialState: IInitialState = {
  message: '',
  show: false,
};

const uiModalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    show(state, action: PayloadAction<{message: string}>) {
      uiModalSlice.caseReducers.close(state);
      const { message } = action.payload;
      state.message = message;
      state.show = true;
    },
    close(state) {
        state.message = '';
        state.show = false;
    }
  }
});

export const actionsModalInfo = uiModalSlice.actions;

export default uiModalSlice.reducer;