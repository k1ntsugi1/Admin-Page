import { Middleware } from "@reduxjs/toolkit";

import { actionsModalInfo } from "../slices/uiModalinfo/uiModalInfoSlice";

export const showErrorModal: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action;
    if (type.includes('rejected')) {
        const {message} = payload;
        store.dispatch(actionsModalInfo.show({message: `Ошибка: ${message}`, pathOfNavigate: null}))
    }
    return next(action);
}