import React, { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";

class Login extends Component<RouteComponentProps> {
    render(){
        return <div onClick={()=>this.props.history.push("/home")}>Login</div>
    }
}

export default Login;