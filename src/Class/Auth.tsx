import { AUTH_TOKEN, CLIENT_TOKEN } from "../constants/storage";
import storage from "./Storage";

class Auth {

    public isAuthenticated = async ():Promise<any> => {
        const token:string = await storage.get(AUTH_TOKEN);
        if(token){
            return token;
        }
        throw new Error();
    }

    public getToken = async ():Promise<any> => {
        let token:string = await storage.get(AUTH_TOKEN);
        if(token){
            return token;
        }
        token = await storage.get(CLIENT_TOKEN);
        if(token){
            return token;
        }
        throw new Error();
    }
}

export default new Auth();