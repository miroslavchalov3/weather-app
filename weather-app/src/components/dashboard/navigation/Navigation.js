import React, { Component } from 'react';
import Logout from '../logout/Logout'
import './Navigation.css';
import { withRouter } from 'react-router-dom';

class Navigation extends Component{

    state = {
        usarname: sessionStorage.getItem('name'),
        text:{
            welcome: "Welcome To Weather App Navigation",
            listUsers: "Users"
        }
    }

    RedirectToListPage = () => {
        const { history } = this.props;
        history.push('/users');
    }


    render(){
        return (
            <div className="navigation-container">
                <div className="user-container"><span className="username">Username:</span><span className="bold">{this.state.usarname}</span></div>
                <div className="welcome-container"><h1>{this.state.text.welcome}</h1></div>
                <div className="log-out-container"><Logout></Logout></div>
                <button className="left-margin button login" onClick={this.RedirectToListPage}>{this.state.text.listUsers}</button>
            </div>
        )
    }
}

export default withRouter(Navigation);
