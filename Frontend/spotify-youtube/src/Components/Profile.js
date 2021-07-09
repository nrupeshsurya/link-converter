import '../App.css';
import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle, Container, Row, Col, CardGroup } from 'reactstrap';

const axios = require('axios');
class Profile extends Component {
    constructor() {
        super();
        this.state=({
          name: '',
          image: ''
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
            (response.data.images[0] === undefined)?self.setState({name: response.data.display_name}):
            self.setState({name: response.data.display_name, image: response.data.images[0]['url']}, () => {console.log(self.state);})
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render() {
      
        return (
            <div className="app flex-row align-items-center" style = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Container style={{maxWidth: '50vmin', maxHeight: '80vmin', width: '100%', height: '40%'}}>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2" style ={{ maxWidth: "100%"}}>
                                    <CardBody>
                                        <div style= {{
                                            backgroundColor: '#eeeeee',
                                            padding: '10% 10%',
                                            border: '1%',
                                            borderRadius: '2%',
                                        }}>
                                            <div>
                                               <CardImg src={this.state.image} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '70%' }}/> 
                                            </div>
                                            <div>
                                                <CardTitle style={{ fontSize: '175%'}}>
                                                    Welcome to Convert Song Links, {this.state.name}.
                                                </CardTitle>
                                                <p>
                                                    You can use this website to convert <span style={{color:'#1DB954'}}>Spotify</span> links to 
                                                    <span style={{color:'#c4302b'}}> YouTube Music</span> links and vice-versa. Happy Listening!
                                                </p>
                                                
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
       }
}

export default Profile
