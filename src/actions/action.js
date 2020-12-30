import {GET_PHOTO, GET_USERNAME, LIKE_PHOTO, LOAD_PHOTOS, UNLIKE_PHOTO} from "./types";

export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    photos,
});

export const getPhoto = (photo) => ({
    type: GET_PHOTO,
    photo,
});

export const likePhoto = (photo) =>  ({
    type: LIKE_PHOTO,
    id: photo.id,
    likes: photo.likes,
});

export const unlikePhoto = (photo) => ({
    type: UNLIKE_PHOTO,
    id: photo.id,
    likes: photo.likes,
});

export const getUserName = (user) => ({
    type: GET_USERNAME,
    user,
});



