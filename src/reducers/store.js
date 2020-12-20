import {applyMiddleware, createStore} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import {getTokenFromStorage} from "../services/utils";
import {setAuthHeader} from "../services/httpService";
import {fetchUser, userLoggingIn} from "../actions/user";
import queryString from "query-string";
import auth from "../services/authService";

export const store = createStore(reducer, applyMiddleware(thunk));
const userToken = getTokenFromStorage();

setAuthHeader(userToken);
if (userToken) store.dispatch(fetchUser());
const { code, error } = queryString.parse(window.location.search);

if (code && code.length === 64) {
    window.history.replaceState({}, null, "/");
    store.dispatch(userLoggingIn());
    try {
        auth.getBearerToken(code).then(() => {
            store.dispatch(fetchUser());
        });
    } catch (error) {}
}

if (error) window.history.replaceState({}, null, "/");