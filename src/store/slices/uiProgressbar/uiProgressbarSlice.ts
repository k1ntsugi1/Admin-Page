import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const uiProgressbarSlice = createSlice({
  name: 'progressbar',
  initialState: {
    percentOfFilling: 0,
    typeOfProgressBar: 'circle'
  },
  reducers: {
    updatepPercentOfFilling(state, action: PayloadAction<{ percentOfFilling: number }>) {
      state.percentOfFilling = action.payload.percentOfFilling;
    },
    setTypeOfProgressbar(state, action: PayloadAction<{ typeOfProgressBar: string }>) {
      state.typeOfProgressBar = action.payload.typeOfProgressBar;
    }
  }
});

export const actionsProgressbar = uiProgressbarSlice.actions;

export default uiProgressbarSlice.reducer;
