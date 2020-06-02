import React, { Component } from 'react';
import Requester from '../../utils/requester';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component{

    state = {
        user: "",
        password: "",
        invalidLogin: false,
        text: {
            invalidLoginText: "Wrong username or password",
        },
    }

    handleUserName = (e) => {
        this.setState({user: e.target.value});
    }

    handleUserPassword = (e) => {
        this.setState({password: e.target.value});
    }

    // Login user
    Login = async () =>{
        const { history } = this.props;
        let user = this.state.user;
        let password = this.state.password;
        let hash = btoa(`${user}:${password}`);
        try {
        const result = await Requester(`/login`, 'GET',{},{authorization: hash});
        sessionStorage.setItem('hash', result.hash);
        sessionStorage.setItem('name', result.name);
        this.setState({nvalidLogin: false});
        history.push('/dashboard');
        } catch (e) {
            this.setState({invalidLogin: true});
        }
    };

    render () {
        return (
            <div>
                <h1>Login</h1>
                    <input className="form-inputs" type="text" placeholder="user" value={this.state.user} onChange={this.handleUserName}></input>
                    <input className="form-inputs" type="password" placeholder="password" value={this.state.password} onChange={this.handleUserPassword}></input>
                    {this.state.invalidLogin ? <span className="error">{this.state.text.invalidLoginText}</span> : ""}
                    <button className="button login small-margin-top" onClick={this.Login}>Login</button>
            </div> 
        );
    }
}

export default withRouter(LoginPage);
