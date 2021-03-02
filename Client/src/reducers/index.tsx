import {combineReducers} from "redux";
import osoby from "./osoby";
import smenky from "./smenky";
import osobaDetail from "./osobaDetail";
import smenkaDetail from "./smenkaDetail";

export default combineReducers({osoby, smenky, osobaDetail, smenkaDetail});