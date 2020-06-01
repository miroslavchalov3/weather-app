import React, { Component } from 'react';
import Requester from '../../utils/requester';

class LoginPage extends Component{

    state = {
        user: "",
        password: "",
        value: "",
    }
    handleUserName = (e) => {
        this.setState({user: e.target.value});
    }

    handleUserPassword = (e) => {
        this.setState({password: e.target.value});
    }


    userLogin = () =>{
        console.log(this.state);
        let user = this.state.user;
        let password = this.state.password;
        let hash = btoa(`${user}:${password}`);
        console.log(hash);
        Requester(`http://localhost:3000/login`, 'GET',{},{authorization: hash})

    }



    render () {
        return (
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="user" value={this.state.user} onChange={this.handleUserName}></input>
                <input type="password" placeholder="password" value={this.state.password} onChange={this.handleUserPassword}></input>
                <button onClick={this.userLogin}>Login </button>
            </div> 
        );
    }
}

export default LoginPage;
