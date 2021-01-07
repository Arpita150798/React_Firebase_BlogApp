import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import SignUp from "./components/Signup";


class App extends Component{
  render(){
    return (
      <Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/dashboard/" component={Dashboard} />
          </Switch>
    </div></Router>
      
    );
  }
}

export default App;
