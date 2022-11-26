import { Middleware } from "@reduxjs/toolkit";

import { actionsModalInfo } from "../slices/uiModalinfo/uiModalInfoSlice";
import { actionsNotification } from "../slices/uiNotification/uiNotificationSlice"; 

export const showInfo: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action;
    if (type.includes('rejected')) {
        const {message} = payload;
        store.dispatch(actionsModalInfo.show({message: `Ошибка: ${message}`, pathOfNavigate: null}))
        store.dispatch(actionsNotification.show({message, type: 'error'}))
    }
    if (type.includes('pending')) {
        store.dispatch(actionsNotification.show({message: `Подождите`, type: 'wait'}))
    }
    if (type.includes('fulfilled')) {
        store.dispatch(actionsNotification.show({message: `Выполнено`, type: 'success'}))
    }
    return next(action);
}