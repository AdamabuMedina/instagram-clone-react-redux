import { RECEIVE_USER, USER_LOGGING_IN } from "../actions/types";

const initialState = {
  authUser: {},
  isLoggingIn: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        authUser: action.user,
        isLoggingIn: false
      };
    case USER_LOGGING_IN:
      return {
        ...state,
        isLoggingIn: true
      };
    default:
      return state;
  }
};

export default user;
