import Auth from "../Class/Auth"
import storage from "../Class/Storage";
import { AUTH_TOKEN, CLIENT_TOKEN } from "../constants/storage";

export const getExtraHeaders = async ():Promise<any> => {
    return {
        authtoken : await Auth.getAuthToken(),
        clienttoken: await Auth.getClientToken()
      }
}

export const setTokenInStorage = (obj:any) => {
    const {authtoken,clienttoken} = obj;
    if(authtoken){
      storage.set(AUTH_TOKEN,authtoken);
    }
    if(clienttoken){
      storage.set(CLIENT_TOKEN,clienttoken);
    }
}