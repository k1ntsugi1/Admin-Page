import { configureStore } from '@reduxjs/toolkit';

import dataUserReducer from './slices/dataUser/dataUserSlice';
import dataPostsReducer from './slices/dataPosts/dataPostsSlice';
import dataCommentsReducer from './slices/dataComments/dataCommentsSlice';
import dataAlbumsReducer from './slices/dataAlbums/dataAlbumsSlice';
import dataPhotosReducer from './slices/dataPhotos/dataPhotosSlice';
import dataTodosReducer from './slices/dataTodos/dataTodosSLice';

import uiSidebarReducer from './slices/uiSidebar/uiSidebarSlice';
import uiProgressbarReducer from './slices/uiProgressbar/uiProgressbarSlice';
import uiNotificationReducer from './slices/uiNotification/uiNotificationSlice';
import uiModalInfoReducer from './slices/uiModalinfo/uiModalInfoSlice';

import { showInfo } from './middleWares/showInfo';

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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(showInfo)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
