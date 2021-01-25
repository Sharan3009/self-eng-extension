import React, { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import LoginButton from "../shared/authButton/authButton";
import { TextField } from "@material-ui/core";

class Login extends Component<RouteComponentProps> {

    // componentDidMount(){
    //     google.init();
    // }

    render(){
        return <form className="absolute-center">
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
                    <LoginButton onClick={()=>{}} text="Login"/>
                    <div className="text-center text-muted py-2 small">
                        <span>Forgot password? </span>
                        <span className="font-weight-bolder clickable">Click here</span>
                    </div>
                </form>
    }
}

export default Login;