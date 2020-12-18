import {RECEIVE_USER, USER_LOGGING} from "../actions/types";

const initialState = {
    authUser: {},
    isLogging: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                authUser: action.user,
                isLogging: false
            }
        case USER_LOGGING:
            return {
                ...state,
                isLogging: true
            }
        default:
            return state
    }
}

export default user