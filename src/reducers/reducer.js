import {combineReducers} from "redux";
import user from "./userReducer"
import images from "./imagesReducer";

const rootReducer = combineReducers({ images, user });

export default rootReducer;