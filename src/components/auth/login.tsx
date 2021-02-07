import { Component, FormEvent } from "react";
import LoginButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { ILoginForm } from "../../Interface/CredentialForm";
import { compose } from "redux";
import { setFormData } from "../../actions/auth/login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Login extends Component<any> {

    private login = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        alert(1)
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

        const {email,password} = this.props;
        return <form onSubmit={this.login} noValidate>
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
                    <div className="text-center text-muted pt-2 small">
                        <Link to="forgotPassword">Forgotten password? </Link>
                    </div>
                </form>
    }
}

type S2P = {
    login:ILoginForm
}
const mapStateToProps = ({login}:S2P) => {
     const {email,password} = login;
     return {
         email,password
     };
  }

export default compose(
    connect<ILoginForm,{},{},S2P>(mapStateToProps)
)(Login);