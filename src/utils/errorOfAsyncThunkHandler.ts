import axios, { AxiosError } from "axios";

export const errorOfAsyncThunkHandler = (err: AxiosError | Error) => {
    if (axios.isAxiosError(err)) {
        if (err.response) {
          return { message: 'Ошибка сервера' };
        } else if (err.request) {
          return { message: 'Ошибка сети' };
        } else {
          return { message: 'Ошибка сети' };
        }
      }
      return { message: 'Ошибка на клиенте' };
}