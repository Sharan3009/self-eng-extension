import { createStore, combineReducers, Reducer, Store } from "redux";
import signup from "./reducers/auth/signup";
import login from "./reducers/auth/login";

const reducer:Reducer = combineReducers({
    signup,
    login
});

const store:Store = createStore(
    reducer
)

export default store;