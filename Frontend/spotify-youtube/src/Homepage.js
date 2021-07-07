import React from 'react';  
import './App.css';  
import YoutubeToSpotify from './YoutubeToSpotify'
import SpotifyToYoutube from './SpotifyToYoutube';  
import Login from './Login'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';  

function Homepage() {  
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
              <li className="nav-item">
                  <NavLink to={'/Login'} activeClassName="active">Log Out</NavLink>
              </li>    
            </ul>    
          </div>    
        </nav> <br />    
        <Switch>    
          <Route path='/YoutubeToSpotify' component={YoutubeToSpotify} />    
          <Route path='/SpotifyToYoutube' component={SpotifyToYoutube} />  
          <Route path='/Login' component={Login}/>  
        </Switch>  
      </div>    
    </Router>   
  );  
}  

export default Homepage;