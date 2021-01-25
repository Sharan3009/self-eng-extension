import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Entry from "./components/auth/entry";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import AuthenticatedRedirect from "./HOC/AuthenticatedRedirect";
import Home from './components/main/home';

class App extends React.Component {
    
    render(){
      return(
        <BrowserRouter>
          <Switch>
            <AuthenticatedRedirect exact path="/entry" component={Entry} />
            <AuthenticatedRedirect exact path="/login" component={Login}/>
            <AuthenticatedRedirect exact path="/signup" component={SignUp}/>
            <Route exact path="/home" component={Home} />
            <Route path="/">
              <Redirect to="/entry"/>
            </Route>
          </Switch>
        </BrowserRouter>
      )
    }
}

export default App;
