import { Component, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import SignupButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { compose, Store } from "redux";
import { connect } from "react-redux";
import { ISignUpForm } from "../../Interface/CredentialForm";
import {setFormData} from "../../actions/auth/signup";

class SignUp extends Component<RouteComponentProps&ISignUpForm&Store> {

    private signup = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(1)
    }

    private setForm = (e:FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name,value} = (e.target as HTMLInputElement);
        this.props.dispatch(setFormData(name,value,true))
    }

    render(){

        const {name,email,password,confirmPassword} = this.props;
        return <form className="absolute-center" onSubmit={this.signup}>
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
                        />
                    <TextField
                        label="Password"
                        name="password"
                        variant="outlined"
                        type="password"
                        className="pb-3 wpx-240"
                        size="small"
                        value={password.value}
                        onChange={this.setForm}
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
                        />
                    <SignupButton text="Sign up"/>
                </form>
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