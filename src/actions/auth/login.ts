import axios from "axios";

export const FORM_HANDLER:string = "LOGIN_FORM_HANDLER";

export const setFormData = (name:string,value:string) => {
    return {
        type: FORM_HANDLER,
        payload:{
            name,value
        }
    }
}

export function loginApi(email:string,password:string){
    return axios.post(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}user/login`,
        {
            email,
            password
        }
    )
}