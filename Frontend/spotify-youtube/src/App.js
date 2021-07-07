import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" style={{ height: 424, width: 288 }}/>
        </header>
        <body className="App-body">
            <a
                className="App-link"
                href='http://127.0.0.1:5000/'
                target="_blank"
                rel="noopener noreferrer"
            >
                Login to Spotify
            </a> 
        </body>
      </div>
    );
  }
}

export default App;