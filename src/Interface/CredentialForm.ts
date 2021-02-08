interface ISignUpForm{
    name:ISignUpObj,
    email:ISignUpObj,
    password:ISignUpObj,
    confirmPassword:ISignUpObj,
}

export interface ISignUpProps extends ISignUpForm{
    loader:boolean
}

export interface ISignUpObj {
    error:boolean,
    value:string,
    message:string,
    touched: boolean
}

export interface ILoginForm{
    email:string,
    password:string
}

export interface IForgotPasswordForm{
    email:string
}