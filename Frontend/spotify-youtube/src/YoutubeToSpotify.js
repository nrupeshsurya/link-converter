import youtubeLogo from './youtubeMusicLogo2.svg';
import spotifyLogo from './spotifyLogo.svg';
import './App.css';
import React, { Component } from "react";
import { Button, Input } from 'reactstrap';

const axios = require('axios');

class YoutubeToSpotify extends Component {
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
      this.setState({ youtubeLink: event.target.value}, () => {console.log(this.state.youtubeLink);})
    }

    spotifyLink(event) {
      this.setState({ spotifyLink: event.target.value })
    }

    handleConvert() {
      var self = this;
      var data = new FormData();
      data.append('link', self.state.youtubeLink);
      console.log(data);
      if (self.state.youtubeLink !== '') {
        axios
        .post('http://localhost:5000/convertYoutube', data, { withCredentials:true })
        .then(function(response) { self.setState({ spotifyLink: response.data.link}, function() {console.log(self.state.spotifyLink);})})
        .catch(function(error)  {console.log(error);})
      }
      
    }

    render() {
        return (
          <div className="App-body">
            <div className="container" style = {{ paddingTop: '100px' }}>
                <div className="row"> 
                    <div className="column" style={{float:'left'}}>
                        <img src={youtubeLogo} alt="logo" style={{ height: '50px' }} />
                    </div>
                    <div className="column" style={{float:'left'}}>
                        <Input type="text" onChange={this.youtubeLink} placeholder="Enter Youtube Link" className="enter-text"/>
                    </div>
                </div>
                <div className="row"> 
                    <div className="column" style={{float:'left'}}>
                        <img src={spotifyLogo} alt="logo" style={{ height: '50px' }} />
                    </div>
                    <div className="column" style={{float:'left'}}>
                        <Input type="text" onChange={this.spotifyLink} placeholder="Spotify Link" className="enter-text"/>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ paddingLeft: '70px'}}>
                    <Button onClick={this.handleConvert} className="ConvertY2S-link" block >
                          Convert
                    </Button>
                </div>    
            </div>
          </div>
        );
    }
    
}

export default YoutubeToSpotify


    
/*
    render() {
        return (
            <div className="YoutubeToSpotify">
                <Container>
                    <Row style = {{
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        height: '50px',
                        marginBottom: '20px',
                        backgroundColor: '#0375FF',
                        borderRadius: '5px',
                        borderWidth: '0px',
                        color: 'white',
                        fontSize:'20px',
                    }}>
                        <Col>
                            <img src={youtubeLogo} alt="logo" style={{ height: 53, width: 36 }}/>
                        </Col>
                        <Col>
                            <Input type = "text" onChange={this.youtubeLink} placeholder="Enter Youtube Link"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img src={logo} alt="logo" style={{ height: 53, width: 36 }}/>
                        </Col>
                        <Col>
                            <Input type = "text" onChange={this.SpotifyLink} placeholder="Enter Youtube Link"/>
                        </Col> 
                    </Row>
                </Container>
            </div>
        )
    }

*/