import { ADD_IMAGES, LIKED_PHOTO, UNLIKED_PHOTO, LOG_OUT, LOG_IN } from "../constants.js"

export const addImages = state => ({
  type: ADD_IMAGES,
  images: state
})

export const likedPhoto = state => ({
  type: LIKED_PHOTO,
  id: state
})

export const unlikedPhoto = state => ({
  type: UNLIKED_PHOTO,
  id: state
})

export const logInAction = () => ({
  type: LOG_IN,
})

export const logOutAction = () => ({
  type: LOG_OUT,
})