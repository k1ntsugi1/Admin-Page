import { configureStore } from '@reduxjs/toolkit';
import uiSidebarReducer from './slices/uiSidebarSlice';
const store = configureStore({
  reducer: {
    uiSidebar: uiSidebarReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
