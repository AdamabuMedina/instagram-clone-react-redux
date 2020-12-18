import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
//import { composeWithDevTools } from "redux-devtools-extension";
import queryString from "query-string";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { setAuthHeader } from "./services/httpService";
import auth from "./services/authService";
import reducer from "./reducers";
import { fetchUser, userLoggingIn } from "./actions/user";
import { getTokenFromStorage } from "./utils";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";

//const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(reducer, applyMiddleware(thunk));
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

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
