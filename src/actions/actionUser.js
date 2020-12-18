import {RECEIVE_USER, USER_LOGGING} from "./types";
import {getUser} from "../services/userService";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const userLogging = () => ({
    type: USER_LOGGING
})

export const fetchUser = () => async dispatch => {
    try {
        const {data: user} = await getUser();
        return dispatch(receiveUser(user));
    } catch (error) {
    }
}