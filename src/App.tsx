import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Entry from "./components/auth/entry";
import SignUp from "./components/auth/signup";
import AuthenticatedRedirect from "./HOC/AuthenticatedRedirect";
import Home from './components/main/home';
import { connect } from "react-redux";
import { socketConnect } from './actions/socket';

class App extends React.Component<any> {

  componentDidMount(){
    this.props.dispatch(socketConnect());
  }
  
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <AuthenticatedRedirect exact path="/entry" component={Entry} />
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

export default connect()(App);
