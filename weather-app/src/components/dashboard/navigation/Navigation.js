import React, { Component } from 'react';
import Logout from '../logout/Logout'
import './Navigation.css';

class Navigation extends Component{

    state = {
        usarname: sessionStorage.getItem('name'),
        text:{
            welcome: "Welcome To Weahter App Navigation",
        }
    }


    render(){
        return (
            <div className="navigation-container">
                <div className="user-container"><span className="username">Username:</span><span className="bold">{this.state.usarname}</span></div>
                <div className="welcome-container"><h1>{this.state.text.welcome}</h1></div>
                <div className="log-out-container"><Logout></Logout></div>
            </div>
        )
    }
}

export default Navigation;
