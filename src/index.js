import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
import store from "./reducers/store";
import { createBrowserHistory } from 'history'

const customHistory = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
