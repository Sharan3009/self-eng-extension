import { ERROR_HANDLER, FORM_HANDLER, TOUCH_HANDLER } from "../../actions/auth/signup";
import { Action } from "../../Interface/Action";
import { ISignUpForm, ISignUpObj } from "../../Interface/CredentialForm";

const initialState:ISignUpForm = {
    email: {
        error:false,
        value:"",
        message:"",
        touched:false
    },
    name: {
        error:false,
        value:"",
        message:"",
        touched:false
    },
    password: {
        error:false,
        value:"",
        message:"",
        touched:false
    },
    confirmPassword: {
        error:false,
        value:"",
        message:"",
        touched:false
    },
}

const reducer = (state:ISignUpForm = initialState,action:Action):ISignUpForm => {
    switch(action.type){

        case FORM_HANDLER: {
            const { name, value } = action.payload;
            const signUpObj:ISignUpObj = (state as any)[name]
            return {
                ...state,
                [name]:{
                    ...signUpObj,
                    value 
                }
            };
        }

        case ERROR_HANDLER: {
            const { name, error, message } = action.payload;
            const signUpObj:ISignUpObj = (state as any)[name]
            return {
                ...state,
                [name]: {
                    ...signUpObj,
                    error,
                    message
                }
            }
        }

        case TOUCH_HANDLER: {
            const { name } = action.payload;
            const touched:boolean = true;
            const signUpObj:ISignUpObj = (state as any)[name]
            return {
                ...state,
                [name]: {
                    ...signUpObj,
                    touched
                }
            }
        }

        default:
            return state;
    }
}
export default reducer;