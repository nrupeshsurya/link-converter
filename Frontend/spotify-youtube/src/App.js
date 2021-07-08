import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login'
import Homepage from './Homepage';

class App extends Component { 
  render() {
    return (   
      <Router>
       <Switch>
            <Route exact path="/" component={ Login }></Route>
            <Route path='/' component={ Homepage }></Route>
       </Switch>
      </Router>
    );  
  }  
}  

export default App;