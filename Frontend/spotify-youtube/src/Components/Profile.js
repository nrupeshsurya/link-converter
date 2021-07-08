import '../App.css';
import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';

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
        // console.log(response.data.display_name);
        self.setState({name: response.data.display_name, image: response.data.images[0]['url']})
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render() {
        const {name, image} = this.state;
        
        return (   
            // <div>
            //     <p>Hi {name} is a test message!</p>
            // </div>
            <div>
                <Card>
                    <CardImg top width="40%" src={image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h6">{name}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Profile
