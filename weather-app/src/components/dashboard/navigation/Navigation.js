import React, { Component } from 'react';
import Logout from '../logout/Logout'

class Navigation extends Component{

    state = {
    }


    render(){
        return (
            <nav>
                <div>Username:</div>
                <h1>Welcome To Weahter App Navigation</h1>
                <Logout></Logout>
            </nav>
        )
    }
}

export default Navigation;
