import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import rootReducer from "./reducer";
import {getTokenFromStorage} from "../services/utils";
import {setAuthHeader} from "../services/httpService";
import {fetchUser} from "../actions/actionUser";

export const store = createStore(rootReducer, applyMiddleware(thunk))
