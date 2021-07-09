import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard';

class App extends Component { 
  render() {
    return (   
      <Router>
       <Switch>
            <Route exact path="/" component={ Login }></Route>
            <Route path='/Dashboard' component={ Dashboard }></Route>
       </Switch>
      </Router>
    );  
  }  
}  

export default App;