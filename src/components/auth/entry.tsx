import React, { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import google from "../../Class/Google";
import GoogleButton from "../shared/googleButton/googleButton";
import Login from "./login";
import Skip from "../shared/skip";

class Entry extends Component<RouteComponentProps> {

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
                    <div className="text-center text-muted font-weight-bold">
                        New user? <Link to="signup">Create account</Link>
                    </div>
                    <Skip />
                </div>
            </div>
    }
}

export default Entry;