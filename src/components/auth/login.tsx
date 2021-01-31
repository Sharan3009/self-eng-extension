import { Component, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { ILoginForm } from "../../Interface/CredentialForm";
import { compose, Store } from "redux";
import { setFormData } from "../../actions/auth/login";
import { connect } from "react-redux";

class Login extends Component<RouteComponentProps&ILoginForm&Store> {

    private login = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        alert(1)
    }

    private setForm = (e:FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name,value} = (e.target as HTMLInputElement);
        this.props.dispatch(setFormData(name,value))
    }

    render(){

        const {email,password} = this.props;
        return <form className="absolute-center" onSubmit={this.login}>
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
                    <LoginButton text="Login"/>
                    <div className="text-center text-muted py-2 small">
                        <span>Forgot password? </span>
                        <span className="font-weight-bolder clickable">Click here</span>
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
    connect(mapStateToProps)
)(Login);