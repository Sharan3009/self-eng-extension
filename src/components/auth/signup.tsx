import React, { Component, FormEvent } from "react";
import {RouteComponentProps } from "react-router-dom";
import SignupButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { compose, Store } from "redux";
import { connect } from "react-redux";
import { ISignUp } from "../../Interface/CredentialForm";

class SignUp extends Component<RouteComponentProps&ISignUp&Store> {

    private signup = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(1)
    }

    render(){

        const {name,email,password,confirmPassword} = this.props;
        return <form className="absolute-center" onSubmit={this.signup}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        type="text"
                        className="pb-3 wpx-240"
                        size="small"
                        value={name}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        className="pb-3 wpx-240"
                        size="small"
                        value={email}
                        />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        className="pb-3 wpx-240"
                        size="small"
                        value={password}
                        />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        className="pb-3 wpx-240"
                        size="small"
                        value={confirmPassword}
                        />
                    <SignupButton text="Sign up"/>
                </form>
    }
}

type S2P = {
    signup:ISignUp
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