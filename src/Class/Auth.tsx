import { AUTH_TOKEN, CLIENT_TOKEN } from "../constants/storage";
import storage from "./Storage";

class Auth {

    public getAuthToken = async ():Promise<any> => {
        return this.getToken(AUTH_TOKEN);
    }

    public getClientToken = async ():Promise<any> => {
        return this.getToken(CLIENT_TOKEN);
    }

    private getToken = async (key:string):Promise<any> => {
        const token:string = await storage.get(key);
        if(token){
            return token;
        }
        throw new Error();
    }
}

export default new Auth();