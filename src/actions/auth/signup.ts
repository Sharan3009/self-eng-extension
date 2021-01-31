import axios from "axios";

export const FORM_HANDLER:string = "FORM_HANDLER";

export const setFormData = (name:string,value:string) => {
    return {
        type: FORM_HANDLER,
        payload:{
            name,value
        }
    }
}