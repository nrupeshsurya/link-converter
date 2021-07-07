import youtubeLogo from './youtubeMusicLogo.svg';
import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { Button, Col, Container, Input, InputGroup, Row } from 'reactstrap';

class YoutubeToSpotify extends Component {
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
                              <img src={youtubeLogo} alt="logo" style={{ height: 79.5, width: 54 }}/>
                            </div>
                              <Input type="text" onChange={this.youtubeLink} placeholder="Enter Youtube Link" className="enter-text"/>
                          </InputGroup>
                      </Col>
                    </Row>
                    <Row>
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
                        <Button onClick={this.handleConvert} className="ConvertY2S-link" block >
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