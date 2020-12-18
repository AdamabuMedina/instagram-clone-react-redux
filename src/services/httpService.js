import axios from "axios";
import { toast } from "react-toastify";
import { accessKey } from "../config.json";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) toast.error("Ошибка запроса.");

  if (error && error.response.status === 403)
    toast.error("Превышен лимит запросов к API.");

  return Promise.reject(error);
});

export const setAuthHeader = token => {
  axios.defaults.headers.Authorization = token
    ? `Bearer ${token}`
    : `Client-ID ${accessKey}`;
};

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete
};
