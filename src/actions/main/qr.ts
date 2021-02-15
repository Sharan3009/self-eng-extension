import { Action } from "../../Interface/Action";

export const GENERATE:string = "GENERATE_QR";
export const CLEAR_INTERVAL:string = "CLEAR_QR_INTERVAL";
export const SET_INTERVAL:string = "SET_QR_INTERVAL";

export const clearInterval = ():Action => {
    return {
        type: CLEAR_INTERVAL
    }
}

export const setQrInterval = (interval:number):Action => {
    return {
        type: SET_INTERVAL,
        payload:interval
    }
}