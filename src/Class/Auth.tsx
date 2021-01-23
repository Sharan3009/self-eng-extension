import storage from "./Storage";

class Auth {

    private authKey:string = "authToken";

    public isAuthenticated = async ():Promise<any> => {
        const token:string = await storage.get<string>(this.authKey);
        if(token){
            return token;
        }
        throw new Error();
    }
}

export default new Auth();