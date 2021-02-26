import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import MainReducer from "./mainReducer";

const reducers = combineReducers({
    mainPage: MainReducer
})

const store = createStore(reducers,
    compose(applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

window.store = store

export default store
