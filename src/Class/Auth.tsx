import storage from "./Storage";

class Auth {

    private authKey:string = "authToken";
    
    public isAuthenticated = async ():Promise<any> => {
        const token:string = await storage.get<string>(this.authKey);
        console.log(token)
        if(token){
            return token
        }
        return new Error();
    }
}

export default new Auth();