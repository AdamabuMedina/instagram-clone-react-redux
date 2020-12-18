import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import auth from "./services/authService";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import queryString from "query-string";
import {fetchUser, userLogging} from "./actions/actionUser";
import {getTokenFromStorage} from "./services/utils";
import {setAuthHeader} from "./services/httpService";

const userToken = getTokenFromStorage()

setAuthHeader(userToken)
if (userToken) store.dispatch(fetchUser())

const {code, error} = queryString.parse(window.location.search)
if (code && code.length === 64) {
    window.history.replaceState({}.null, "/")
    store.dispatch(userLogging())
    try {
        auth.getBearerToken(code).then(() => {
            store.dispatch(fetchUser())
        })
    } catch (error) {
    }
}

if (error) window.history.replaceState({}, null, "/")

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);