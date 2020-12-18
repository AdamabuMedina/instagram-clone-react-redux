import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/me`;

export const getUser = () => http.get(apiEndpoint);
