import {GET_IMAGES, RECEIVE_IMAGES, SET_LIKE} from "./types";

const getImages = () => ({
    type: GET_IMAGES
})

const receiveImages = (images,lastPage ) => ({
    type: RECEIVE_IMAGES,
    images,
    lastPage
})

const setLike = imageId => async dispatch => {
    dispatch({
        type: SET_LIKE,
        imageId
    })
    try {
        await likeImage(imageId)
    }
    catch (error) {}
}