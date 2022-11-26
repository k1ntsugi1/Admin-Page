import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  message: string;
  show: boolean;
  pathOfNavigate: string | null;
}

const initialState: IInitialState = {
  message: '',
  show: false,
  pathOfNavigate: null
};

const uiModalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    show(state, action: PayloadAction<{ message: string; pathOfNavigate: string | null }>) {
      uiModalSlice.caseReducers.close(state);
      const { message, pathOfNavigate } = action.payload;
      state.message = message;
      if (pathOfNavigate) state.pathOfNavigate = pathOfNavigate;
      state.show = true;
    },
    close(state) {
      state.message = '';
      state.pathOfNavigate = null;
      state.show = false;
    }
  }
});

export const actionsModalInfo = uiModalSlice.actions;

export default uiModalSlice.reducer;
