import axios from "../../utils/axios";
import { Action } from "../../Interface/Action";

export const FORM_HANDLER:string = "LOGIN_FORM_HANDLER";
export const LOADER:string = "LOGIN_LOADER"
export const LOGIN_ERR:string = "LOGIN_ERROR";

export const setFormData = (name:string,value:string):Action => {
    return {
        type: FORM_HANDLER,
        payload:{
            name,value
        }
    }
}

export const loginApi = (email:string,password:string):Promise<any> => {
    return axios.post(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}user/login`,
        {
            email,
            password
        }
    )
}

export const showLoader = (show:boolean):Action => {
    return {
        type: LOADER,
        payload: show
    }
}

export const loginError = (msg:string):Action => {
    return {
        type: LOGIN_ERR,
        payload: msg
    }
}