import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  message: string;
  show: boolean;
  //proceedHandler: () => void;
}

interface IShowAction {
    message: string,
    //proceedHandler: () => void;
}

const initialState: IInitialState = {
  message: '',
  show: false,
  //proceedHandler: () => {return},
};

const uiModalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    show(state, action: PayloadAction<IShowAction>) {
      uiModalSlice.caseReducers.close(state);
      const { message } = action.payload;
      state.message = message;
      //state.proceedHandler = proceedHandler;
      state.show = true;
    },
    close(state) {
        state.message = '';
        //state.proceedHandler = () => {return };
        state.show = false;
    }
  }
});

export const actionsModalInfo = uiModalSlice.actions;

export default uiModalSlice.reducer;