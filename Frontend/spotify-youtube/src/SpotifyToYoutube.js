import youtubeLogo from './youtubeMusicLogo2.svg';
import spotifyLogo from './spotifyLogo.svg';
import './App.css';
import React, { Component } from "react";
import { Button, Input } from 'reactstrap';

const axios = require('axios');
class SpotifyToYoutube extends Component {
    constructor() {
        super();
        this.state = {
            youtubeLink:'',
            spotifyLink:'',
        }
        this.youtubeLink = this.youtubeLink.bind(this);
        this.spotifyLink = this.spotifyLink.bind(this);
        this.handleConvert = this.handleConvert.bind(this);   
    }

    youtubeLink(event) {
      this.setState({ youtubeLink: event.target.value })
    }

    spotifyLink(event) {
        this.setState({ spotifyLink: event.target.value}, () => {console.log(this.state.spotifyLink);})
    }

    handleConvert() {
        var self = this;
        var data = new FormData();
        data.append('link', self.state.spotifyLink);
        console.log(data);
        if (self.state.spotifyLink !== '') {
          axios
          .post('http://localhost:5000/convertSpotify', data, { withCredentials:true })
          .then(function(response) { self.setState({ spotifyLink: response.data.link}, function() {console.log(self.state.youtubeLink);})})
          .catch(function(error)  {console.log(error);})
        }
        
      }

    render() {
        return (
          <body className="App-body">
            <div class="container" style = {{ paddingTop: '100px' }}>
                <div class="row"> 
                    <div class="column" style={{float:'left'}}>
                        <img src={spotifyLogo} alt="logo" style={{ height: '50px' }} />
                    </div>
                    <div class="column" style={{float:'left'}}>
                        <Input type="text" onChange={this.spotifyLink} placeholder="Enter Spotify Link" className="enter-text"/>
                    </div>
                </div>
                <div class="row"> 
                    <div class="column" style={{float:'left'}}>
                        <img src={youtubeLogo} alt="logo" style={{ height: '50px' }} />
                    </div>
                    <div class="column" style={{float:'left'}}>
                        <Input type="text" onChange={this.youtubeLink} placeholder="Youtube Link" className="enter-text"/>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ paddingLeft: '70px'}}>
                    <Button onClick={this.handleConvert} className="ConvertS2Y-link" float >
                          Convert
                    </Button>
                </div>
                
            </div>
          </body>
        );
    }
    
}

export default SpotifyToYoutube
