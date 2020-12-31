import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import App from "./containers/App"
import store, { history } from "./reducers/store"
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"

render(
   <Provider store={store}>
      <Router history={history}>
         <App />
      </Router>
   </Provider>,
   document.getElementById("root")
)