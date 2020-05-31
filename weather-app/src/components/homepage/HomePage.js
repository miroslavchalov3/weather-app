import React, { Component } from 'react';
import LoginForm from '../login-form/LoginForm'
import RegisterFrom from '../register-form/RegisterForm'


class HomePage extends Component{

    state = {
        isRegister: false,

    }

    switchForms = () => {
        const currentState = this.state.isRegister;
        this.setState({isRegister : !currentState});
    }

    switchButtons = () => {

    }


    render(){

        return (
            <div>
                <div onClick={this.switchForms}>Not a user Register?</div>
                <div>
                    {this.state.isRegister === true ? <RegisterFrom></RegisterFrom> : <LoginForm></LoginForm>}
                </div>
            </div>
           
          );
    }
}

export default HomePage;
