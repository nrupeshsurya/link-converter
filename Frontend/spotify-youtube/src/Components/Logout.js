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
        .get(`${process.env.REACT_APP_BACKEND_URL}/logout`, { withCredentials:true})
        .then(function (response) {
        console.log(response.data.link);
        self.setState({link: response.data.link})
        window.open(self.state.link)
        window.open(`${process.env.REACT_APP_FRONTEND_URL}`, "_self")
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