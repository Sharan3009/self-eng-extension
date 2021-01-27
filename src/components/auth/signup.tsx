import React, { Component } from "react";
import {RouteComponentProps } from "react-router-dom";
import SignupButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";
import { TargetElement } from "@testing-library/user-event";

class SignUp extends Component<RouteComponentProps> {

    // componentDidMount(){
    //     google.init();
    // }

    render(){
        return <form className="absolute-center">
                    <TextField
                        label="Name"
                        variant="outlined"
                        type="text"
                        className="pb-3 wpx-240"
                        size="small"
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        className="pb-3 wpx-240"
                        size="small"
                        />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        className="pb-3 wpx-240"
                        size="small"
                        />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        className="pb-3 wpx-240"
                        size="small"
                        />
                    <SignupButton onClick={()=>{}}text="Sign up"/>
                </form>
    }
}

export default SignUp;