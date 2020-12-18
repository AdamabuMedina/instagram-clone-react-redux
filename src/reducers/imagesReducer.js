import {
    REQUEST_IMAGES,
    RECEIVE_IMAGES,
    SET_LIKE,
    DELETE_LIKE
} from "../actions/types";

const initialState = {
    items: [],
    isLoading: false,
    lastPage: 0
};

const images = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_IMAGES:
            return {
                ...state,
                isLoading: true
            };
        case RECEIVE_IMAGES: {
            return {
                ...state,
                items: [...state.items, ...action.images],
                isLoading: false,
                lastPage: action.lastPage
            };
        }
        case SET_LIKE: {
            const images = [...state.items];
            const index = images.findIndex(i => i.id === action.imageId);
            images[index] = {...images[index]};
            images[index].liked_by_user = true;
            images[index].likes = images[index].likes + 1;
            return {
                ...state,
                items: images
            };
        }

        case DELETE_LIKE: {
            const images = [...state.items];
            const index = images.findIndex(i => i.id === action.imageId);
            images[index] = {...images[index]};
            images[index].liked_by_user = false;
            images[index].likes = images[index].likes - 1;
            return {
                ...state,
                items: images
            };
        }

        default:
            return state;
    }
};

export default images;