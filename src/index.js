import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
import store from "./reducers/store";
import queryString from "query-string";
import { fetchUser, userLoggingIn } from "./actions/actionUser";
import auth from "./services/authService";

const { code, error } = queryString.parse(window.location.search);

if (code && code.length === 64) {
  window.history.replaceState({}, null, "/");
  store.dispatch(userLoggingIn());
  try {
    auth.getBearerToken(code).then(() => {
      store.dispatch(fetchUser());
    });
  } catch (error) { }
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
