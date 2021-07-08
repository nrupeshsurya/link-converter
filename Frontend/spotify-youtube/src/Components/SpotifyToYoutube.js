import youtubeLogo from '../Logo/youtubeMusicLogo2.svg';
import spotifyLogo from '../Logo/spotifyLogo.svg';
import '../App.css';
import React, { Component } from "react";
import { Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const axios = require('axios');
class SpotifyToYoutube extends Component {
    constructor() {
        super();
        this.state = {
            youtubeLink:'YouTube Link',
            spotifyLink:'',
            disabled:true
        }
        this.spotifyLink = this.spotifyLink.bind(this);
        this.handleConvert = this.handleConvert.bind(this);   
    }

    spotifyLink(event) {
        this.setState({ spotifyLink: event.target.value })
    }

    handleConvert() {
        var self = this;
        var data = new FormData();
        data.append('link', self.state.spotifyLink);
        console.log(data);
        if (self.state.spotifyLink !== 'YouTube Link') {
          axios
          .post('http://localhost:5000/convertYoutube', data, { withCredentials:true })
          .then(function(response) { 
            (response.data.link === 'error')?alert('Song could not be converted. Sorry for the inconvenience!'):
            self.setState({ youtubeLink: response.data.link, disabled: false})
        })
        .catch(function(error)  {alert('Song could not be converted. Are you sure it is the right link?');})
        }
        
      }

    render() {
        return (
          <div className="App-body">
            <div className="container" style = {{ paddingTop: '10%' }}>
                <div className="row"> 
                    <div className="column" style={{float:'left'}}>
                        <img src={spotifyLogo} alt="logo" style={{ height: '50px' }} />
                    </div>
                    <div className="column" style={{float:'left'}}>
                        <Input type="text" onChange={this.spotifyLink} placeholder="Enter Spotify Link" className="enter-text"/>
                    </div>
                </div>
                <div className="row"> 
                    <div className="column" style={{float:'left'}}>
                        <img src={youtubeLogo} alt="logo" style={{ height: '50px' }} />
                    </div>
                    <div className="column" style={{float:'left'}}>
                        <Link to={{pathname:(this.state.youtubeLink)}} target='_blank' style={{ pointerEvents: (this.state.disabled)?'none':'' }}>
                            <Input 
                            type="text" 
                            placeholder='YouTube Link' 
                            className="enter-text" 
                            disabled={(this.state.disabled)?"disabled":""} 
                            value={(this.state.disabled)?null:(this.state.youtubeLink)}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ paddingLeft: '70px'}}>
                    <Button onClick={this.handleConvert} className="ConvertS2Y-link" block >
                          Convert
                    </Button>
                </div>
                
            </div>
          </div>
        );
    }
    
}

export default SpotifyToYoutube
