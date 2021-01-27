import { BgRequest } from "../Interface/Background";
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
        chrome.storage.onChanged.addListener((changes:{[key:string]:chrome.storage.StorageChange})=>{
            if(this.key in changes){
                if(changes[this.key].newValue){
                    cb();
                }
            }
        })
    }
}

export default new GoogleSSO();