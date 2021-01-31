import axios from "axios";

export const FORM_HANDLER:string = "SIGNUP_FORM_HANDLER";

export const setFormData = (name:string,value:string,error:boolean) => {
    return {
        type: FORM_HANDLER,
        payload:{
            name,value,error
        }
    }
}