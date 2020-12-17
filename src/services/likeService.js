import http from "./httpService"
import {apiUrl} from "../config.json"

const apiEndPoint = `${apiUrl}/photos`

export const likeImage = imageId => http.post(`${apiEndPoint}/${imageId}/like`)

export const unlikeImage = imageId => http.delete(`${apiEndPoint}/${imageId}/like`)