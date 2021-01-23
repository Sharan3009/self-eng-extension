import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/login";
import AuthenticatedRedirect from "./HOC/AuthenticatedRedirect";
import Home from './components/main/home';

class App extends React.Component {
    
    render(){
      return(
        <BrowserRouter>
          <Switch>
            <AuthenticatedRedirect exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route path="/">
              <Redirect to="/login"/>
            </Route>
          </Switch>
        </BrowserRouter>
      )
    }
}

export default App;
