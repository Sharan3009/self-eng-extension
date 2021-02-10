import React, { useState, useEffect } from 'react';
import { Route,Redirect } from 'react-router-dom';
import { RouteProps } from "react-router";
import Auth from '../Class/Auth';
import Loader from "../components/shared/loader/loader";

const AuthenticatedRedirectRoute = ({ component: Component, ...rest }:RouteProps):JSX.Element => {
  const [state, setState]:[string,React.Dispatch<React.SetStateAction<string>>] = useState("loading");

  useEffect(() => {
    Auth.isAuthenticated().then(()=>{
      setState("authenticated");
    }).catch(()=>{
      setState("unauthenticated");
    })
  });

  if(!Component || state==="loading") return <Loader isLoader={true}/>;

  return <Route {...rest}
    render={(props) =>
      (state==="authenticated")?<Redirect to={{pathname:"/home"}} />:<Component {...props} />
    }
  />
  };

export default AuthenticatedRedirectRoute