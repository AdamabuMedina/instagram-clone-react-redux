import {DELETE_LIKE, GET_IMAGES, RECEIVE_IMAGES, SET_LIKE} from "./types";
import {likeImage, unlikeImage} from "../services/likeService";
import {getImagesByPage} from "../services/imageService";
import {addShortId, extractDataFromResponse} from "../services/utils";

const getImages = () => ({
    type: GET_IMAGES
})

const receiveImages = (images, lastPage) => ({
    type: RECEIVE_IMAGES,
    images,
    lastPage
})

export const setLike = imageId => async dispatch => {
    dispatch({
        type: SET_LIKE,
        imageId
    })
    try {
        await likeImage(imageId)
    } catch (error) {
    }
}

export const deleteLike = imageId => async dispatch => {
    dispatch({
        type: DELETE_LIKE,
        imageId
    })
    try {
        await unlikeImage(imageId)
    } catch (error) {
    }
}

export const fetchImages = page => async dispatch => {
    dispatch(getImages())
    try {
        const {data, headers} = await getImagesByPage(page)
        const images = addShortId(extractDataFromResponse(data))
        const lastPage = Math.round(headers["x-total"] / 10)
        return dispatch(receiveImages(images, lastPage))
    } catch (error) {}
}