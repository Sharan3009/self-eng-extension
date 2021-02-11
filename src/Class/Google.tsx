import { AUTH_TOKEN } from "../constants/storage";
import { BgRequest } from "../Interface/Background";
import storage from "./Storage";
class GoogleSSO {

    public init = ():void => {
        const req:BgRequest = {
            type: "google",
            payload: AUTH_TOKEN
        }
        chrome.runtime.sendMessage(req);
    }

    public watchAuthToken = (cb:Function):void => {
        storage.watchStorageKey(AUTH_TOKEN,(values)=>{
            if(values.newValue){
                cb(values);
            }
        })
    }
}

export default new GoogleSSO();