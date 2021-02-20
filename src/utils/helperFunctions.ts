import Auth from "../Class/Auth"
import storage from "../Class/Storage";
import { EMIT } from "../constants/background";
import { AUTH_TOKEN, CLIENT_TOKEN } from "../constants/storage";

const getAuth = async ():Promise<string> => {
  const authToken:string = await Auth.getAuthToken();
  const clientToken:string = await Auth.getClientToken();
  let auth:string[] = [];
  if(authToken){
    auth.push(`${AUTH_TOKEN} ${authToken}`);
  }
  if(clientToken){
    auth.push(`${CLIENT_TOKEN} ${clientToken}`);
  }
  return auth.join(", ");
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

export const getAuthHeader = async ():Promise<any> => {
  return {
    authorization: await getAuth()
  }
}

export const socketEmit = (event:string, data?:any):void => {
  chrome.runtime.sendMessage({
    type: EMIT,
    payload: {
      type: event,
      payload:data
    }
  })
}