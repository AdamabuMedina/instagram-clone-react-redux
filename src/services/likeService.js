import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/photos`;

export const likeImage = imageId => http.post(`${apiEndpoint}/${imageId}/like`);

export const unlikeImage = imageId =>
  http.delete(`${apiEndpoint}/${imageId}/like`);
