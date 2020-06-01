import React, { Component } from 'react';
import Navigation from './navigation/Navigation'
import WeatherGraph from './weather-graph/WeatherGraph'
import './Dashboard.css';

class Dashboard extends Component{

    state = {
        userName: "Jon",
        user: {},

    }


    render(){

        return (
            <div class="main">
                <Navigation></Navigation>
                <WeatherGraph></WeatherGraph>
            </div>
          );
    }
}

export default Dashboard;
