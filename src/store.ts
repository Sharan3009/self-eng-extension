import { createStore, combineReducers, Reducer, Store, applyMiddleware, Middleware } from "redux";
import signup from "./reducers/auth/signup";
import login from "./reducers/auth/login";
import qr from "./reducers/main/qr";
import socketMiddleware from "./middlewares/socket";
import socket from "./Class/Socket";
import thunk from "redux-thunk";

const reducer:Reducer = combineReducers({
    signup,
    login,
    qr
});

const middlewares:Middleware[] = [
    thunk,
    socketMiddleware(socket)
];

const store:Store = createStore(
    reducer,
    applyMiddleware(...middlewares)
)

export default store;