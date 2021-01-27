import { BgRequest } from "../Interface/Background";
class GoogleSSO {

    public init = ():void => {
        const req:BgRequest = {
            type: "google",
            payload: "authToken"
        }
        chrome.runtime.sendMessage(req);
    }
}

export default new GoogleSSO();