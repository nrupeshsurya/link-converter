import './App.css';
import React, { Component } from "react";

const axios = require('axios');
class Profile extends Component {
    constructor() {
        super();
        this.state=({
          name: ''
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
        self.setState({name: response.data.display_name})
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render() {
        const {name} = this.state
        return (   
            <div>
                <p>Hi {name} is a test message!</p>
            </div>  
        );
    }
}

export default Profile
