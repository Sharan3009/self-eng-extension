interface ISignUpForm{
    name:ISignUpObj,
    email:ISignUpObj,
    password:ISignUpObj,
    confirmPassword:ISignUpObj,
}

export interface ISignUpProps extends ISignUpForm{
    loader:boolean,
    serverMsg:string,
    serverErr:boolean
}

export interface ISignUpObj {
    error:boolean,
    value:string,
    message:string,
    touched: boolean
}

interface ILoginForm{
    email:string,
    password:string
}

export interface ILoginProps extends ILoginForm{
    loader:boolean,
    serverMsg:string,
    serverErr:boolean
}

export interface IForgotPasswordForm{
    email:string
}