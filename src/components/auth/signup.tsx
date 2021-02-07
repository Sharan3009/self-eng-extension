import { Component, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import SignupButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { compose, Store } from "redux";
import { connect } from "react-redux";
import { ISignUpForm, ISignUpObj,  } from "../../Interface/CredentialForm";
import { setFormData, setFieldError, setFieldTouch } from "../../actions/auth/signup";

type ErrAndMsg = {
    error:boolean,
    message:string
}
class SignUp extends Component<RouteComponentProps&ISignUpForm&Store> {

    private emailRegex:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private signup = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let bool:boolean = ["name","email","password","confirmPassword"].some((txt)=>{
            const signUpObj:ISignUpObj = (this.props as any)[txt];
            const value:string = signUpObj.value;
            const {error,message} = this.getErrorAndMsg(txt,value);
            this.setFieldError(txt,error,message);
            return error;
        });
        if(!bool){
            alert(1);
        }
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
            <form className="mx-auto wpx-240" onSubmit={this.signup} noValidate>
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
                    />
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
                    />
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
                    />
                <SignupButton text="Sign up"/>
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