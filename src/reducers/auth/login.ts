import { FORM_HANDLER, LOADER, SERVER_MSG } from "../../actions/auth/login";
import { Action } from "../../Interface/Action";
import { ILoginProps } from "../../Interface/CredentialForm";

const initialState:ILoginProps = {
    email: "",
    password: "",
    loader:false,
    serverErr:false,
    serverMsg:""
}

const reducer = (state:ILoginProps = initialState,action:Action) => {
    switch(action.type){

        case FORM_HANDLER:
            return {
                ...state,
                [action.payload.name]:action.payload.value
            };
        
        case LOADER:{
            const loader = action.payload;
            return {
                ...state,
                loader
            }
        }
        case SERVER_MSG:{
            const {serverMsg,serverErr} = action.payload;
            return {
                ...state,
                serverErr,
                serverMsg
            }
        }
        default:
            return state;
    }
}
export default reducer;