import React, { Component } from "react";  
import './App.css';  
import YoutubeToSpotify from './YoutubeToSpotify'
import SpotifyToYoutube from './SpotifyToYoutube';  
import Logout from './Logout'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';  

const axios = require('axios');
class Homepage extends Component {
    constructor() {
        super();
        this.state=({
          name: ''
        })
    }

    componentDidMount() {
        this.getData = this.getData.bind(this);
        this.getData();
    }

    getData() {
        var self = this;
        axios
        .get('http://localhost:5000/home',{withCredentials: true})
        .then(function (response) {
        console.log(response.data.display_name);
        self.setState({name: response.data.display_name})
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render() {
        return ( 
            <Router>    
              <div className="container">    
                <nav className="navbar navbar-expand-lg navheader">    
                  <div className="collapse navbar-collapse" >    
                    <ul className="navbar-nav">    
                      <li className="nav-item">    
                        <NavLink to={'/YoutubeToSpotify'} activeClassName="active">YouTube to Spotify</NavLink>    
                      </li>    
                      <li className="nav-item">    
                        <NavLink to={'/SpotifyToYouTube'} activeClassName="active">Spotify To YouTube</NavLink>    
                      </li>
                      <li className="nav-item go-right">    
                        <NavLink to={'/Logout'} activeClassName="active">Log Out</NavLink>    
                      </li>   
                    </ul>    
                  </div>    
                </nav> <br />    
                <Switch>    
                  <Route path='/YoutubeToSpotify' component={YoutubeToSpotify} />    
                  <Route path='/SpotifyToYoutube' component={SpotifyToYoutube} />
                  <Route path='/Logout' component={Logout} />  
                </Switch>  
              </div>    
            </Router>   
        );
    }
}

export default Homepage;