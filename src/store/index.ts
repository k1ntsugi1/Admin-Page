import { configureStore } from '@reduxjs/toolkit';
import dataPostsReducer from './slices/Posts/dataPostsSlice';
import dataCommentsReducer from './slices/Comments/dataCommentsSlice';
import uiSidebarReducer from './slices/uiSidebarSlice';
import uiProgressbarReducer from './slices/uiProgressbarSlice';
const store = configureStore({
  reducer: {
    dataPosts: dataPostsReducer,
    dataComments: dataCommentsReducer,
    uiSidebar: uiSidebarReducer,
    uiProgressbar: uiProgressbarReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
