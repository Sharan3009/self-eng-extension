import { FORM_HANDLER } from "../../actions/auth/login";
import { Action } from "../../Interface/Action";
import { ILoginForm } from "../../Interface/CredentialForm";

const initialState:ILoginForm = {
    email: "",
    password: ""
}

const reducer = (state:ILoginForm = initialState,action:Action) => {
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