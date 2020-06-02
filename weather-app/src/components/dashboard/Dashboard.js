import React, { Component } from 'react';
import Navigation from './navigation/Navigation'
import WeatherGraph from './weather-graph/WeatherGraph';
import  { withRouter } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends Component{

    state = {
        userName: "Jon",
        user: {},

    }


    render(){
        return (
            <div className="main">
                <Navigation></Navigation>
                <WeatherGraph></WeatherGraph>
            </div>
          );
    }
}

export default withRouter(Dashboard);
