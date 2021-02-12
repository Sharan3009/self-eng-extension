import Auth from "../Class/Auth"

export const getExtraHeaders = async ():Promise<any> => {
    return {
        authtoken : await Auth.getAuthToken(),
        clienttoken: await Auth.getClientToken()
      }
}