import Auth from "../Class/Auth"
import storage from "../Class/Storage";
import { AUTH_TOKEN, CLIENT_TOKEN } from "../constants/storage";

const getAuth = async ():Promise<string> => {
  const authToken:string = await Auth.getAuthToken();
  const clientToken:string = await Auth.getClientToken();
  let auth:string = "";
  if(authToken){
    auth += `${AUTH_TOKEN} ${authToken}`;
  }
  if(clientToken){
    auth += `${CLIENT_TOKEN} ${clientToken}`;
  }
  return auth;
}

export const setTokenInStorage = (obj:any) => {
  const {authToken,clientToken} = obj;
  if(authToken){
    storage.set(AUTH_TOKEN,authToken);
  }
  if(clientToken){
    storage.set(CLIENT_TOKEN,clientToken);
  }
}

export const getAuthHeader = async ():Promise<any> => {
  return {
    authorization: await getAuth()
  }
}