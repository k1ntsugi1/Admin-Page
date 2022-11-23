import { configureStore } from '@reduxjs/toolkit';

import dataUserReducer from './slices/dataUserSlice';
import dataPostsReducer from './slices/Posts/dataPostsSlice';
import dataCommentsReducer from './slices/Comments/dataCommentsSlice';
import dataAlbumsReducer from './slices/Albums/dataAlbumsSlice'
import dataPhotosReducer from './slices/Photos/dataPhotosSlice';
import dataTodosReducer from './slices/Todos/dataTodosSLice';

import uiSidebarReducer from './slices/uiSidebarSlice';
import uiProgressbarReducer from './slices/uiProgressbarSlice';
import uiNotificationReducer from './slices/uiNotificationSlice';
import uiModalInfoReducer from './slices/uiModalInfoSlice';

const store = configureStore({
  reducer: {
    dataUser: dataUserReducer,
    dataPosts: dataPostsReducer,
    dataComments: dataCommentsReducer,
    dataAlbums: dataAlbumsReducer,
    dataPhotos: dataPhotosReducer,
    dataTodos: dataTodosReducer,
    uiSidebar: uiSidebarReducer,
    uiProgressbar: uiProgressbarReducer,
    uiNotification: uiNotificationReducer,
    uiModalInfo: uiModalInfoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
