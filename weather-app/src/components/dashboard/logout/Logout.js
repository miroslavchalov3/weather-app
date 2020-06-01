import React, { Component } from 'react';
import "./Logout.css";
import { withRouter } from 'react-router-dom';

class Logout extends Component{

    state = {
        text: {
            logout: "Log out"
        }
    }

    logOut = () => {
        const { history } = this.props;
        sessionStorage.clear();

        history.push('/');
    }

    render(){
        return (
            <button className="button login" onClick={this.logOut}>{this.state.text.logout}</button>
        )
    }
}

export default withRouter(Logout);
