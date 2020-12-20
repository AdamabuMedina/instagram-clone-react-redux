import { getUser } from "../services/userService";
import {RECEIVE_USER, USER_LOGGING_IN} from "./types";

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const userLoggingIn = () => ({
  type: USER_LOGGING_IN
});

export const fetchUser = () => async dispatch => {
  try {
    const { data: user } = await getUser();
    return dispatch(receiveUser(user));
  } catch (error) {}
};
