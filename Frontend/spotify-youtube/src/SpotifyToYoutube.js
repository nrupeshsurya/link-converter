import youtubeLogo from './youtubeMusicLogo.svg';
import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { Button, Col, Container, Input, InputGroup, Row } from 'reactstrap';

class SpotifyToYoutube extends Component {
    constructor() {
        super();
        this.state = {
            youtubeLink:'',
            spotifyLink:'',
        }
        this.youtubeLink = this.youtubeLink.bind(this);
        this.spotifyLink = this.spotifyLink.bind(this);   
    }

    youtubeLink(event) {
      this.setState({ youtubeLink: event.target.value })
    }

    spotifyLink(event) {
      this.setState({ spotifyLink: event.target.value })
    }

    render() {
        return (
          <body className="App-body">
            <div className="YoutubeToSpotify">
                <Container>
                    <Row>
                      <Col>
                        
                      </Col>
                      <Col>
                          <InputGroup>
                            <div class="pull-left">
                              <img src={logo} alt="logo" style={{ height: 79.5, width: 54 }}/>
                            </div>
                              <Input type="text" onChange={this.spotifyLink} placeholder="Enter Spotify Link" className="enter-text"/>
                          </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputGroup>
                          <div class="pull-left">
                              <img src={youtubeLogo} alt="logo" style={{ height: 79.5, width: 54 }}/>
                            </div>
                          <Input type="text" onChange={this.youtubeLink} placeholder="Enter Youtube Link" className="enter-text"/>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button onClick={this.handleConvert} className="ConvertS2Y-link" block >
                          Convert
                        </Button>
                      </Col>
                    </Row>
                </Container>
            </div>
          </body>
        );
    }
    
}

export default SpotifyToYoutube
