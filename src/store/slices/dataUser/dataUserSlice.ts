import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  userId: number | null;
}

const initialState: IInitialState = {
  userId: null
};

const dataUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<{ id: number | null }>) {
      state.userId = action.payload.id;
    }
  }
});

export const actionsUser = dataUserSlice.actions;

export default dataUserSlice.reducer;
