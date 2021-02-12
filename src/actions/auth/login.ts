import axios from "../../utils/axios";
import { Action } from "../../Interface/Action";

export const FORM_HANDLER:string = "LOGIN_FORM_HANDLER";
export const LOADER:string = "LOGIN_LOADER"
export const SERVER_MSG:string = "LOGIN_SERVER_MSG";

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
        "user/login",
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

export const serverMsg = (serverMsg:string,serverErr:boolean=true):Action => {
    return {
        type: SERVER_MSG,
        payload: {
            serverErr,serverMsg
        }
    }
}