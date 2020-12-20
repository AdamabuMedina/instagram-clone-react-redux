import {applyMiddleware, createStore} from "redux";
import reducer from "./index";
import thunk from "redux-thunk";
import {getTokenFromStorage} from "../services/utils";
import {setAuthHeader} from "../services/httpService";
import {fetchUser} from "../actions/actionUser";

const store = createStore(reducer, applyMiddleware(thunk));
const userToken = getTokenFromStorage();

setAuthHeader(userToken);
if (userToken) store.dispatch(fetchUser());

export default store