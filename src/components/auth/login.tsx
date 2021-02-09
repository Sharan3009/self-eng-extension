import { Component, FormEvent } from "react";
import LoginButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { ILoginProps } from "../../Interface/CredentialForm";
import { compose } from "redux";
import { setFormData, loginApi, showLoader, loginError } from "../../actions/auth/login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import storage from "../../Class/Storage";
import Loader from "../shared/loader/loader";
import Error from "../shared/error";

class Login extends Component<any> {

    private login = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        this.props.dispatch(loginError(""));
        this.props.dispatch(showLoader(true));
        const {email,password} = this.props;
        loginApi(email,password)
        .then((token:string)=>{
            this.props.dispatch(loginError(""));
            this.props.dispatch(showLoader(false));
            storage.set("authToken",token)
        })
        .catch((error)=>{
            this.props.dispatch(loginError(error));
            this.props.dispatch(showLoader(false));
        })
    }

    private setForm = (e:FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name,value} = (e.target as HTMLInputElement);
        this.props.dispatch(setFormData(name,value))
    }

    private disabled = ():boolean => {
        const {email,password} = this.props;
        if(!email || !password){
            return true;
        }
        return false;
    }

    render(){

        const {email,password,loader,loginError} = this.props;
        return <form onSubmit={this.login} noValidate>
                    <Loader isLoader={loader} />
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        className="pb-3 wpx-240"
                        size="small"
                        value={email}
                        onChange={this.setForm}
                        />
                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        className="pb-3 wpx-240"
                        size="small"
                        value={password}
                        onChange={this.setForm}
                        />
                    <LoginButton text="Login" disabled={this.disabled()}/>
                    <Error msg={loginError}/>
                    <div className="text-center text-muted pt-2 small">
                        <Link to="forgotPassword">Forgotten password? </Link>
                    </div>
                </form>
    }
}

type S2P = {
    login:ILoginProps
}
const mapStateToProps = ({login}:S2P) => {
     const {email,password,loader,loginError} = login;
     return {
         email,password,loader,loginError
     };
  }

export default compose(
    connect<ILoginProps,{},{},S2P>(mapStateToProps)
)(Login);