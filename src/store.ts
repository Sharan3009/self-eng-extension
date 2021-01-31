import { createStore, combineReducers, Reducer, Store } from "redux";
import signup from "./reducers/auth/signup";

const reducer:Reducer = combineReducers({
    signup
});

const store:Store = createStore(
    reducer
)

export default store;