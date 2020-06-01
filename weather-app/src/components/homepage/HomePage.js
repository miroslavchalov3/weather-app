import React, { Component } from 'react';
import LoginForm from '../login-form/LoginForm'
import RegisterFrom from '../register-form/RegisterForm'
import './HomePage.css';

class HomePage extends Component{

    state = {
        isRegister: false,
        text: {
            registerTitle: "Not a user Register ?",
            loginTitle: "Alredy Register ",
            clickHereText: "click here",
            register: "Register",
            login: "Login"
        },
    }

    switchForms = () => {
        const currentFormState = this.state.isRegister;
        this.setState({isRegister : !currentFormState});
    }

    switchButtons = () => {

    }


    render(){

        return (
            <div class="form-container">
                <div class="form">
                <div> {this.state.isRegister ? 
                    <p>{this.state.text.loginTitle} <span class="link" onClick={this.switchForms}> {this.state.text.clickHereText}</span></p> : 
                    <p>{this.state.text.registerTitle} <span class="link" onClick={this.switchForms}> {this.state.text.clickHereText}</span></p>
                    }
                </div>
                    <div>
                        {this.state.isRegister ? <RegisterFrom></RegisterFrom> : <LoginForm></LoginForm>}
                    </div>
                    <div>
                        {this.state.isRegister ? <button value="Register" class="button register">{this.state.text.register}</button> : 
                        <button class="button login"> {this.state.text.login}</button>}
                    </div>
                </div>
                
                
            </div>
           
          );
    }
}

export default HomePage;
