import { Dispatch } from "react";
import { Action } from "../../Interface/Action";
import { socketEmit } from "../socket";

export const GENERATE:string = "GENERATE_QR";

export const generateQr = ():(dispatch:Dispatch<any>)=>void => {
    return (dispatch:Dispatch<any>)=>{
        dispatch(socketEmit(GENERATE,"chal mera putt"));
    }
}

export const onGenerateQr = ():Promise<any> => {
    return Promise.resolve();
}