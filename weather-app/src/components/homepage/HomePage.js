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
            <div className="form-container">
                <div className="form">
                <div> {this.state.isRegister ? 
                    <p>{this.state.text.loginTitle} <span className="link" onClick={this.switchForms}> {this.state.text.clickHereText}</span></p> : 
                    <p>{this.state.text.registerTitle} <span className="link" onClick={this.switchForms}> {this.state.text.clickHereText}</span></p>
                    }
                </div>
                    <div>
                        {this.state.isRegister ? <RegisterFrom></RegisterFrom> : <LoginForm></LoginForm>}
                    </div>
                    <div>
                        {this.state.isRegister ? <button value="Register" className="button register">{this.state.text.register}</button> : 
                        <button className="button login"> {this.state.text.login}</button>}
                    </div>
                </div>
                
                
            </div>
           
          );
    }
}

export default HomePage;
