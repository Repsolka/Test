import {combineReducers, createStore} from "redux";
import appReducer from "./test-reducer";


let reducers = combineReducers({
    testPage: appReducer
    });

let store = createStore(reducers);

export default store;