import React, { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import google from "../../Class/Google";
import GoogleButton from "../shared/googleButton/googleButton";
import Signup from "../shared/authButton/authButton";

class Entry extends Component<RouteComponentProps> {

    redirectToLogin = ():void =>{
        this.props.history.push("/login");
    }

    redirectToSignup = ():void => {
        this.props.history.push("/signup");
    }

    loginWithGoogle = ():void => {
        google.init();
    }

    componentDidMount(){
        google.watchAuthToken(()=>{
            this.props.history.push("/home")
        })
    }

    render(){
        return <div className="absolute-center">
                <GoogleButton onClick={this.loginWithGoogle}/>
                <div className="d-flex align-items-center text-muted py-2">
                    <div className="col border-bottom h-50"></div>
                    <div className="px-2">or</div>
                    <div className="col border-bottom h-50"></div>
                </div>
                <Signup text="Sign Up" onClick={this.redirectToSignup}/>
                <div className="text-center text-muted py-2 small">
                    <span>Already a user? </span>
                    <span className="font-weight-bolder clickable" onClick={this.redirectToLogin}>Login now</span>
                </div>
            </div>
    }
}

export default Entry;