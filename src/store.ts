import { createStore, combineReducers, Reducer, Store, applyMiddleware } from "redux";
import signup from "./reducers/auth/signup";
import login from "./reducers/auth/login";
import socketMiddleware from "./middlewares/socket";
import socket from "./Class/Socket";

const reducer:Reducer = combineReducers({
    signup,
    login
});

const middlewares = [socketMiddleware(socket)];

const store:Store = createStore(
    reducer,
    applyMiddleware(...middlewares)
)

export default store;