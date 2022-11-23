import { configureStore } from '@reduxjs/toolkit';

import dataPostsReducer from './slices/Posts/dataPostsSlice';
import dataCommentsReducer from './slices/Comments/dataCommentsSlice';
import dataAlbumsReducer from './slices/Albums/AlbumsSlice'

import uiSidebarReducer from './slices/uiSidebarSlice';
import uiProgressbarReducer from './slices/uiProgressbarSlice';
import uiNotificationReducer from './slices/uiNotificationSlice';
import uiModalInfoReducer from './slices/uiModalInfoSlice';

const store = configureStore({
  reducer: {
    dataPosts: dataPostsReducer,
    dataComments: dataCommentsReducer,
    dataAlbums: dataAlbumsReducer,
    uiSidebar: uiSidebarReducer,
    uiProgressbar: uiProgressbarReducer,
    uiNotification: uiNotificationReducer,
    uiModalInfo: uiModalInfoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
