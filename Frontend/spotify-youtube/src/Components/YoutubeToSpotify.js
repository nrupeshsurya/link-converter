import youtubeLogo from '../Logo/youtubeMusicLogo2.svg';
import spotifyLogo from '../Logo/spotifyLogo.svg';
import '../App.css';
import React, { Component } from "react";
import { Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const axios = require('axios');

class YoutubeToSpotify extends Component {
    constructor() {
        super();
        this.state = {
            youtubeLink:'',
            spotifyLink:'Spotify Link',
            disabled:true
        }
        this.youtubeLink = this.youtubeLink.bind(this); 
        this.handleConvert = this.handleConvert.bind(this); 
    }

    componentDidMount() {
        this.checkAuth = this.checkAuth.bind(this);
        this.checkAuth();
    }

    checkAuth() {
        axios
        .get('http://localhost:5000/checkLogin', {withCredentials: true})
        .then(function(response) {
            console.log(response.data.authorize);
            if (response.data.authorize === false){
                window.open('http://localhost:3000', "_self")
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    youtubeLink(event) {
      this.setState({ youtubeLink: event.target.value})
    }

    handleConvert() {
      var self = this;
      var data = new FormData();
      data.append('link', self.state.youtubeLink);
      console.log(data);
      if (self.state.youtubeLink !== '') {
        axios
        .post('http://localhost:5000/convertSpotify', data, { withCredentials:true })
        .then(function(response) { 
            (response.data.link === 'error')?alert('Song could not be converted. Sorry for the inconvenience!'):
            self.setState({ spotifyLink: response.data.link, disabled: false})
        })
        .catch(function(error)  {alert('Song could not be converted. Are you sure it is the right link?');})
      }
      
    }

    render() {
        return (
          <div className="App-body">
            <div className="container" style = {{ paddingTop: '15vh' }}>
                <div className="row"> 
                    <div className="column" style={{float:'left'}}>
                        <img src={youtubeLogo} alt="logo" style={{ height: '7vh' }} />
                    </div>
                    <div className="column" style={{float:'left'}}>
                        <Input type="text" onChange={this.youtubeLink} placeholder="Enter YouTube/YouTube Music Link" className="enter-text"/>
                    </div>
                </div>
                <div className="row"> 
                    <div className="column" style={{float:'left'}}>
                        <img src={spotifyLogo} alt="logo" style={{ height: '7vh' }} />
                    </div>
                    <div className="column" style={{float:'left'}}>
                    <Link to={{pathname:(this.state.spotifyLink)}} target='_blank' style={{ pointerEvents: (this.state.disabled)?'none':'' }}>
                            <Input 
                            type="text" 
                            placeholder='Spotify Link' 
                            className="enter-text" 
                            disabled={(this.state.disabled)?"disabled":""} 
                            value={(this.state.disabled)?null:(this.state.spotifyLink)}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ paddingLeft: '2vw'}}>
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