import {getImagesByPage} from "../services/imageService";
import {likeImage, unlikeImage} from "../services/likeService";
import {addShortId, extractDataFromResponse} from "../services/utils";
import {REQUEST_IMAGES, RECEIVE_IMAGES, SET_LIKE, DELETE_LIKE} from "./types";

const requestImages = () => ({
    type: REQUEST_IMAGES
});

const receiveImages = (images, lastPage) => ({
    type: RECEIVE_IMAGES,
    images,
    lastPage
});

export const setLike = imageId => async dispatch => {
    try {
        await likeImage(imageId);
    } catch (error) {
    }
    dispatch({
        type: SET_LIKE,
        imageId
    });
};

export const deleteLike = imageId => async dispatch => {
    try {
        await unlikeImage(imageId);
    } catch (error) {
    }
    dispatch({
        type: DELETE_LIKE,
        imageId
    });
};

export const fetchImages = page => async dispatch => {

    try {
        const {data, headers} = await getImagesByPage(page);
        const images = addShortId(extractDataFromResponse(data));
        const lastPage = Math.round(headers["x-total"] / 10);
        return dispatch(receiveImages(images, lastPage));
    } catch (error) {
    }
    dispatch(requestImages());
};
