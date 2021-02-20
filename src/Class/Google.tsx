import { GOOGLE_LOGIN } from "../constants/background";
import { AUTH_TOKEN } from "../constants/storage";
import { sendMessage } from "../utils/helperFunctions";
import storage from "./Storage";
class GoogleSSO {

    public init = ():void => {
        sendMessage(GOOGLE_LOGIN,AUTH_TOKEN);
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