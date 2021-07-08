import { Component } from "react";

const axios = require('axios');
class Logout extends Component {
    constructor() {
        super();
        this.state=({
          link: {}
        })
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    componentDidMount() {
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogout();
    }

    handleLogout() {
        var self = this;
        axios
        .get('http://localhost:5000/logout', { withCredentials:true})
        .then(function (response) {
        console.log(response.data.link);
        self.setState({link: response.data.link})
        window.open(self.state.link)
        window.open('http://localhost:3000', "_self")
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render() {
        return null;
    }
}

export default Logout;