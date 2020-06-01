import React, { Component } from 'react';
import './WeatherGraph.css';
class WeatherGraph extends Component{

    state = {
    }


    render(){
        return(
            <div>
                <div className="widget">
                    <div className="weatherIcon"><i className="wi-day-cloudy"></i></div>
                    <div className="weatherInfo">
                        <div className="temperature"><span>25&deg;</span></div>
                        <div className="description">    
                        <div className="weatherCondition">CLOUDY</div>    
                        <div className="place">New York, New York</div>
                        </div>
                    </div>
                    <div className="date">1st Jan</div>
                </div>
            </div>
        )
    }
}

export default WeatherGraph;
