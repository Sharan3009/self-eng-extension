import { FORM_HANDLER } from "../../actions/auth/signup";
import { Action } from "../../Interface/Action";
import { ISignUpForm } from "../../Interface/CredentialForm";

const initialState:ISignUpForm = {
    email: {
        error:false,
        value:""
    },
    name: {
        error:false,
        value:""
    },
    password: {
        error:false,
        value:""
    },
    confirmPassword: {
        error:false,
        value:""
    },
}

const reducer = (state:ISignUpForm = initialState,action:Action) => {
    switch(action.type){

        case FORM_HANDLER:
            return {
                ...state,
                [action.payload.name]:{
                    value: action.payload.value,
                    error: action.payload.error
                }
            };

        default:
            return state;
    }
}
export default reducer;