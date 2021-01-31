export interface ISignUp{
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface ILogin{
    email:string,
    password:string
}

export interface IForgotPassword{
    email:string
}