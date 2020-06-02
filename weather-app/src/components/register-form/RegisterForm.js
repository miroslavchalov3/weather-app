import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Requester from '../../utils/requester';


class RegisterFrom extends Component {

    state =  {
        user: "",
        password: "",
        isUserRegisterd: false,
        text: {
            userTaken: "User is alredy taken",
            register: "Register",
            signUp: "Sign Up",
            statusMessage: "",
        }
    }

    handleUserName = (e) => {
        this.setState({user: e.target.value});
    }

    handleUserPassword = (e) => {
        this.setState({password: e.target.value});
    }

    register = async () => {
        const { history } = this.props;
        let user = this.state.user;
        let password = this.state.password;
        let hash = btoa(`${user}:${password}`);
        let registerForm = {
            name: user,
            password,
            hash
        };
        try{
            const result = await Requester(`/register`, 'POST', registerForm);
            sessionStorage.setItem('hash', result.hash);
            sessionStorage.setItem('name', result.name);
            history.push('/dashboard');
        } catch(e) {
            this.setState({isUserRegisterd: true});
            this.setState({statusMessage: e});
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.text.register}</h1>
                <input className="form-inputs" type="text" placeholder="user" value={this.state.user} onChange={this.handleUserName}></input>
                    <input className="form-inputs" type="password" placeholder="password" value={this.state.password} onChange={this.handleUserPassword}></input>
                    {this.state.isUserRegisterd ? <span className="error">{this.state.text.userTaken}</span> : ""}
                <button className="button login" onClick={this.register}>{this.state.text.signUp}</button>
            </div> 
        )
    }
}


export default withRouter(RegisterFrom);
