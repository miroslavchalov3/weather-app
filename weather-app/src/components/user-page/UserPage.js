import React, { Component } from 'react';
import Requester from '../../utils/requester';
import './UserPage.css';

class UserPage extends Component{

    state = {
        isUsersLoaded: false,
    }

    getUsers = async () => {
        let hash = sessionStorage.getItem("hash");

        try{
            const result = await Requester('/users', "GET", {}, {authorization: hash});
            this.setState({result : result});
            this.setState({isUsersLoaded: true});

        } catch(e){
            console.log(e);
        }

    }


    DeleteUser = async (id) => {
        let hash = sessionStorage.getItem("hash");
        console.log(id);
        console.log(hash);

        try{
            const result = await Requester(`/user/${id}`, "DELETE",{}, {Authorization: hash});
            this.getUsers();
        } catch(e){
            console.log(e);
        }
    }

    componentDidMount= () => {
        this.getUsers();
    }

    render(){
        return (
           <div>
            {this.state.isUsersLoaded ? this.state.result.map(item => {
                return <div className="user-container">
                    <div className="user"  hash={item.hash}><span className="name">Name:{item.name}</span>
                    <button className="deleteUser login" onClick={this.DeleteUser.bind(this, item.id)}>Delete User</button></div>
                </div>
            }): ""}
            </div>
          );
    }
}

export default UserPage;
