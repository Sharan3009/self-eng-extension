import { createStore, combineReducers, Reducer, Store } from "redux";
import signup from "./reducers/auth/signup";
import login from "./reducers/auth/login";
import qr from "./reducers/main/qr";

const reducer:Reducer = combineReducers({
    signup,
    login,
    qr
});

const store:Store = createStore(
    reducer,
)

export default store;