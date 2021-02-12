import axios from "axios";
import { Action } from "../../Interface/Action";

export const FORM_HANDLER:string = "SIGNUP_FORM_HANDLER";
export const ERROR_HANDLER:string = "SIGNUP_ERROR_HANDLER";
export const TOUCH_HANDLER:string = "SIGNUP_TOUCH_HANDLER";
export const LOADER:string = "SIGNUP_LOADER";
export const SERVER_MSG:string = "SIGNUP_SERVER_MSG";

export const setFormData = (name:string,value:string):Action => {
    return {
        type: FORM_HANDLER,
        payload: {
            name,value
        }
    }
}

export const setFieldError = (name:string,error:boolean,message:string):Action => {
    return {
        type:ERROR_HANDLER,
        payload: {
            name,error,message
        }
    }
}

export const setFieldTouch = (name:string):Action => {
    return {
        type: TOUCH_HANDLER,
        payload: {
            name
        }
    }
}

export const showLoader = (show:boolean):Action => {
    return {
        type: LOADER,
        payload: show
    }
}

export const signUpApi = (name:string,email:string,password:string,confirmPassword:string):Promise<any> => {
    return axios.post(
        "user/signup",
        {
            name,
            email,
            password,
            confirmPassword
        }
    )
}

export const serverMsg = (serverMsg:string,serverErr:boolean=true):Action => {
    return {
        type: SERVER_MSG,
        payload:{
            serverErr,
            serverMsg
        }
    }
}