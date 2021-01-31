import { FORM_HANDLER } from "../../actions/auth/signup";
import { Action } from "../../Interface/Action";
import { ISignUp } from "../../Interface/CredentialForm";

const initialState:ISignUp = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
}

const reducer = (state:ISignUp = initialState,action:Action) => {
    switch(action.type){

        case FORM_HANDLER:
            return {
                ...state,
                [action.payload.name]:action.payload.value
            };

        default:
            return state;
    }
}
export default reducer;