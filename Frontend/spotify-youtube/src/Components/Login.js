import logo from '../Logo/logo.svg';
import '../App.css';
import React, { Component } from "react";
import { Button } from 'reactstrap';

const axios = require('axios');

class Login extends Component {
  constructor() {
    super();
    this.state=({
      link: {}
    })
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    var self = this;
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/login`)
    .then(function (response) {
      console.log(response.data.link);
      self.setState({link: response.data.link})
      window.open(self.state.link, "_self")
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" style={{ height: 424, width: 288 }}/>
        </header>
        <div className="App-body">
            <Button onClick={this.handleLogin} className="App-link" block rel="noopener noreferrer" target="_blank">
              Login to Spotify
            </Button> 
        </div>
      </div>
    );
  }
}

export default Login;