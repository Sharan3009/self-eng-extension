import { ERROR_HANDLER, FORM_HANDLER,
     TOUCH_HANDLER, LOADER, SERVER_ERR } from "../../actions/auth/signup";
import { Action } from "../../Interface/Action";
import { ISignUpProps, ISignUpObj } from "../../Interface/CredentialForm";

const initialState:ISignUpProps = {
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
    loader:false,
    signupError:""
}

const reducer = (state:ISignUpProps = initialState,action:Action):ISignUpProps => {
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

        case LOADER: {
            const loader:boolean = action.payload;
            return {
                ...state,
                loader
            }
        }

        case SERVER_ERR: {
            const signupError:string = action.payload;
            return {
                ...state,
                signupError
            }
        }

        default:
            return state;
    }
}
export default reducer;