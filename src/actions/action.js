import { ADD_IMAGES, LIKED_IMAGE, LOG_IN, LOG_OUT } from "./types";

export const addImages = state => ({
   type: ADD_IMAGES,
   images: state
})

export const logInUser = () => ({
   type: LOG_IN,
})

export const logOutUser = () => ({
   type: LOG_OUT,
})

export const likedImage = state => ({
   type: LIKED_IMAGE,
   id: state,
})

export const unlikedImage = state => ({
   type: LIKED_IMAGE,
   id: state,
})