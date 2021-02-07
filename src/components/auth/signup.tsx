import React, { Component, FormEvent, createRef } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import SignupButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { compose, Store } from "redux";
import { connect } from "react-redux";
import { ISignUpForm, ISignUpObj } from "../../Interface/CredentialForm";
import { setFormData, setFieldError, setFieldTouch, signUpApi } from "../../actions/auth/signup";
import Skip from "../shared/skip";

type ErrAndMsg = {
    error:boolean,
    message:string
}
class SignUp extends Component<RouteComponentProps&ISignUpForm&Store> {

    private ref:any = {
        name:createRef(),
        email:createRef(),
        password:createRef(),
        confirmPassword:createRef()
    }

    private emailRegex:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    private validateAndSignUp = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let refFound:boolean = false;
        let errCount:number = ["name","email","password","confirmPassword"].filter((txt)=>{
            const signUpObj:ISignUpObj = (this.props as any)[txt];
            const value:string = signUpObj.value;
            const {error,message} = this.getErrorAndMsg(txt,value);
            if(!refFound && error){
                refFound = true;
                this.ref[txt].current.focus()
            }
            this.setFieldError(txt,error,message);
            return error;
        }).length;
        if(errCount===0){
            this.signup();
        }
    }

    private signup = () => {
        const { name, email, password, confirmPassword } = this.props;
        signUpApi(name.value,email.value,password.value,confirmPassword.value)
        .then((response)=>{
            console.log(response.data);
        }).catch((error)=>{
            console.error(error);
        })
    }

    private setForm = (e:FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name,value} = (e.target as HTMLInputElement);
        this.props.dispatch(setFormData(name,value));
        const fieldObj:ISignUpObj = (this.props as any)[name];
        if(fieldObj.touched && fieldObj.error){
            const errorMsg:ErrAndMsg = this.getErrorAndMsg(name,value);
            this.setFieldError(name,errorMsg.error,errorMsg.message);
        }
        
    }

    private getErrorAndMsg = (name:string,value:string):ErrAndMsg => {
        let error:boolean = false;
        let message:string = "";
        switch(name){
            case "name": {
                if(!value){
                    error = true;
                    message = "Name is required";
                } else if(value.length>20){
                    error = true;
                    message = "Name cannot be more than 20 letters"
                }
                break;
            }
            case "email": {
                if(!value){
                    error = true;
                    message = "Email is required";
                } else if(!this.emailRegex.test(value)){
                    error = true;
                    message = "Email is not valid";
                }
                break;
            }
            case "password": {
                if(!value){
                    error = true;
                    message = "Password is required";
                } else if(value.length<8){
                    error = true;
                    message = "Password must be ateast 8 letters";
                }
                break;
            }
            case "confirmPassword": {
                if(!value) {
                    error = true;
                    message = "Password confirmation is required";
                } else if(this.props.password.value != value){
                    error = true;
                    message = "Passwords do not match"
                }
                break;
            }
        }

        return {error,message};
    }

    private setFieldError = (field:string, error:boolean,message:string) => {
        this.props.dispatch(setFieldError(field,error,message))
    }

    private setFieldTouch = (e:FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name} = e.target as HTMLInputElement
        this.props.dispatch(setFieldTouch(name));
    }

    render(){

        const {name,email,password,confirmPassword} = this.props;
        return <div className="d-flex align-items-center h-100">
            <form className="mx-auto wpx-240 mt-5" onSubmit={this.validateAndSignUp} noValidate>
                <TextField
                    error={name.error}
                    label="Name"
                    name="name"
                    variant="outlined"
                    type="text"
                    className="pb-3 wpx-240"
                    size="small"
                    value={name.value}
                    onChange={this.setForm}
                    onFocus={this.setFieldTouch}
                    helperText={name.message}
                    autoFocus
                    inputRef={this.ref.name}
                />
                <TextField
                    error={email.error}
                    label="Email"
                    name="email"
                    variant="outlined"
                    type="email"
                    className="pb-3 wpx-240"
                    size="small"
                    value={email.value}
                    onChange={this.setForm}
                    onFocus={this.setFieldTouch}
                    helperText={email.message}
                    inputRef={this.ref.email}                    />
                <TextField
                    error={password.error}
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    className="pb-3 wpx-240"
                    size="small"
                    value={password.value}
                    onChange={this.setForm}
                    onFocus={this.setFieldTouch}
                    helperText={password.message}
                    inputRef={this.ref.password}                    />
                <TextField
                    error={confirmPassword.error}
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    type="password"
                    className="pb-3 wpx-240"
                    size="small"
                    value={confirmPassword.value}
                    onChange={this.setForm}
                    onFocus={this.setFieldTouch}
                    helperText={confirmPassword.message}
                    inputRef={this.ref.confirmPassword}                    />
                <SignupButton text="Sign up"/>
                <div className="d-flex align-items-center py-3">
                    <div className="border-bottom w-100 h-50"></div>
                </div>
                <div className="text-center text-muted font-weight-bold">
                    Already a user? <Link to="entry">Login now</Link>
                </div>
                <Skip />
            </form>
        </div>
    }
}

type S2P = {
    signup:ISignUpForm
}
const mapStateToProps = ({signup}:S2P) => {
     const {name,email,password,confirmPassword} = signup;
     return {
         name,email,password,confirmPassword
     };
  }

export default compose(
    connect(mapStateToProps)
)(SignUp);