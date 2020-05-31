import React, { Component } from 'react';
import LoginForm from '../login-form/LoginForm'
import RegisterFrom from '../register-form/RegisterForm'


class HomePage extends Component{

    state = {
        isRegister: false,
        registerTitle: "Not a user Register",
        loginTitle: "Please Login to the platform"

    }

    switchForms = () => {
        const currentFormState = this.state.isRegister;
        this.setState({isRegister : !currentFormState});
    }

    switchButtons = () => {

    }


    render(){

        return (
            <div>
                <div onClick={this.switchForms}> {this.state.isRegister ? this.state.registerNote : this.state.loginNote}</div>
                <div>
                    {this.state.isRegister ? <RegisterFrom></RegisterFrom> : <LoginForm></LoginForm>}
                </div>
            </div>
           
          );
    }
}

export default HomePage;
