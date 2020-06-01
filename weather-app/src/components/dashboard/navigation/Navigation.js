import React, { Component } from 'react';
import Logout from '../logout/Logout'
import './Navigation.css';

class Navigation extends Component{

    state = {
    }


    render(){
        return (
            <div class="navigation-container">
                <div>Username:</div>
                <h1>Welcome To Weahter App Navigation</h1>
                <Logout></Logout>
            </div>
        )
    }
}

export default Navigation;
