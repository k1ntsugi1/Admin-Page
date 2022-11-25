import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  showState: string;
  activePage: string;
}

const initialState: IInitialState = {
  showState: 'hidden',
  activePage: 'home'
};

const uiSidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActivePage(state, action: PayloadAction<{ page: string }>) {
      state.activePage = action.payload.page;
    },
    toggleShowState(state, action: PayloadAction<{ showState: string }>) {
        state.showState = action.payload.showState;
    }
  }
});

export const actionsUiSidebar = uiSidebarSlice.actions;

export default uiSidebarSlice.reducer;
