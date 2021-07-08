import React, { Component } from "react";  
import '../App.css';  
import YoutubeToSpotify from './YoutubeToSpotify'
import SpotifyToYoutube from './SpotifyToYoutube';  
import Logout from './Logout'
import Profile from './Profile';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';  

class Homepage extends Component {
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
                  <Route exact path='/Homepage' component={Profile} />
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