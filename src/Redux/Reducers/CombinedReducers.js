import { combineReducers } from "redux";
import TReducer from "./ThreadsReducer";
import UserReducer from "./UserReducer";


export default combineReducers(
    {
        Threads:TReducer,
        Users:UserReducer

    }

)