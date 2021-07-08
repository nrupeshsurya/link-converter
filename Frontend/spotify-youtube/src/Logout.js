import { Component } from "react";


class Logout extends Component {

    componentDidMount() {
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogout();
    }

    handleLogout() {
        const url = 'http://localhost:5000/logout';
        window.open(url, "_self");
    }
}

export default Logout;