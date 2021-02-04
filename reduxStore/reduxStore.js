import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import MainReducer from "./mainReducer";

const reducers = combineReducers ({
    mainPage : MainReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store
