import React, { Component } from "react";
import { Link, Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import google from "../../Class/Google";
import GoogleButton from "../shared/googleButton/googleButton";
import Login from "./login";
import NewAccount from "../shared/authButton/authButton";

class Entry extends Component<RouteComponentProps> {

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
        return <div className="d-flex align-items-center h-100">
                <div className="mx-auto wpx-240">
                    <GoogleButton onClick={this.loginWithGoogle}/>
                    <div className="d-flex align-items-center text-muted py-2">
                        <div className="col border-bottom h-50"></div>
                        <div className="px-2">or</div>
                        <div className="col border-bottom h-50"></div>
                    </div>
                    <Login />
                    <div className="d-flex align-items-center py-3">
                        <div className="border-bottom w-100 h-50"></div>
                    </div>
                    <NewAccount text="Create New Account" color="btn-success" onClick={this.redirectToSignup}/>
                </div>
            </div>
    }
}

export default withRouter(Entry);