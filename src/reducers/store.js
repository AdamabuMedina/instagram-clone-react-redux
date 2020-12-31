import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import { setAccessTokenUnplash } from "../unsplash/unsplash";
import reducer from "./reducer";

const initialState = []
const code = window.location.search.split("code=")[1]

export const history = createBrowserHistory()
const middleware = routerMiddleware(history)

const store = createStore(
   reducer,
   initialState,
   applyMiddleware(middleware),
)

if (code) {
   setAccessTokenUnplash(code)
   history.push("/photos")
}

export default store