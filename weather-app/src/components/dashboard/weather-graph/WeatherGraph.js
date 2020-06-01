import React, { Component } from 'react';
import './WeatherGraph.css';
class WeatherGraph extends Component{

    state = {
    }


    render(){
        return(
            <article class="widget">
                <div class="weatherIcon"><i class="wi-day-cloudy"></i></div>
                <div class="weatherInfo">
                    <div class="temperature"><span>25&deg;</span></div>
                    <div class="description">    
                    <div class="weatherCondition">CLOUDY</div>    
                    <div class="place">New York, New York</div>
                    </div>
                </div>
                <div class="date">1st Jan</div>
            </article>
        )
    }
}

export default WeatherGraph;
