import { createStore, combineReducers, Reducer, Store, applyMiddleware, Middleware } from "redux";
import signup from "./reducers/auth/signup";
import login from "./reducers/auth/login";
import qr from "./reducers/main/qr";
import socket from "./reducers/socket";
import socketMiddleware from "./middlewares/socket";
import Socket from "./Class/Socket";
import thunk from "redux-thunk";

const reducer:Reducer = combineReducers({
    signup,
    login,
    qr,
    socket
});

const middlewares:Middleware[] = [
    thunk,
    socketMiddleware(Socket)
];

const store:Store = createStore(
    reducer,
    applyMiddleware(...middlewares)
)

export default store;