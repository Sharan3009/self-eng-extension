import { createStore, combineReducers, Reducer, Store, applyMiddleware } from "redux";
import signup from "./reducers/auth/signup";
import login from "./reducers/auth/login";
import qr from "./reducers/main/qr";
import socketMiddleware from "./middlewares/socket";

const reducer:Reducer = combineReducers({
    signup,
    login,
    qr
});

const store:Store = createStore(
    reducer,
    applyMiddleware(socketMiddleware())
)

export default store;