import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const uiProgressbarSlice = createSlice({
  name: 'progressbar',
  initialState: {
    percentOfFilling: 0,
  },
  reducers: {
    updatepPercentOfFilling(state, action: PayloadAction<{ percentOfFilling: number }>) {
      state.percentOfFilling = action.payload.percentOfFilling;
    },
  }
});

export const actionsProgressbar = uiProgressbarSlice.actions;

export default uiProgressbarSlice.reducer;