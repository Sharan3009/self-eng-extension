import { AUTH_TOKEN } from "../constants/storage";
import storage from "./Storage";

class Auth {

    public isAuthenticated = async ():Promise<any> => {
        const token:string = await storage.get<string>(AUTH_TOKEN);
        if(token){
            return token;
        }
        throw new Error();
    }
}

export default new Auth();