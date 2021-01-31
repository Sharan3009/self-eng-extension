import { FORM_HANDLER } from "../../actions/auth/login";
import { Action } from "../../Interface/Action";
import { ILogin } from "../../Interface/CredentialForm";

const initialState:ILogin = {
    email: "",
    password: ""
}

const reducer = (state:ILogin = initialState,action:Action) => {
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