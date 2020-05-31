import React, { Component } from 'react';
import Navigation from './navigation/Navigation'
import WeatherGraph from './weather-graph/WeatherGraph'


class Dashboard extends Component{

    state = {
        userName: "Jon",
        user: {},

    }


    render(){

        return (
            <div>
                <Navigation></Navigation>
                <WeatherGraph></WeatherGraph>
            </div>
          );
    }
}

export default Dashboard;
