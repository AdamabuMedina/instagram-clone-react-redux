import {GET_USERNAME} from "../actions/types";

const initialState = {
  username: "",
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME:
      return action.user

    default:
      return state
  }
}

export default user
