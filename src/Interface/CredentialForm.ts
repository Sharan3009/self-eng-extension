export interface ISignUpForm{
    name:ISignUpObj,
    email:ISignUpObj,
    password:ISignUpObj,
    confirmPassword:ISignUpObj,
}

interface ISignUpObj {
    error:boolean,
    value:string
}

export interface ILoginForm{
    email:string,
    password:string
}

export interface IForgotPasswordForm{
    email:string
}