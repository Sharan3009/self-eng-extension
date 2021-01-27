import { BgRequest } from "../Interface/Background";
import storage from "./Storage";
class GoogleSSO {

    private key:string = "authToken";
    public init = ():void => {
        const req:BgRequest = {
            type: "google",
            payload: this.key
        }
        chrome.runtime.sendMessage(req);
    }

    public watchAuthToken = (cb:Function):void => {
        storage.watchStorageKey(this.key,(values)=>{
            if(values.newValue){
                cb(values);
            }
        })
    }
}

export default new GoogleSSO();