import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/photos`;

export const getImagesByPage = (page = 1) =>
  http.get(`${apiEndpoint}/?page=${page}`);
