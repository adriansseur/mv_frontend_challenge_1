import counterReducer from "./counter";
import inputReducer from "./input";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    balance: counterReducer,
    isValid: inputReducer
})

export default allReducers