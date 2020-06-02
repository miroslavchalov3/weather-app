import React, { Component } from 'react';
import './Widget.css';
import Requester from '../../../utils/requester';
import { parse } from 'querystring';
class Widget extends Component{

    state = {
    }


    convertDate = (incomingDate) => {
        let date = new Date(incomingDate * 1000);
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 
        return (`${day} ${month}`);
    }

    ConvertTemperature = (incomingTemp) => {
        const kelvin = 273.15;
        return parseInt((incomingTemp-kelvin));
    }


    render(){
        return(
                <div className="widget">
                    <div className="weatherIcon">{this.props.weather}</div>
                    <div className="weatherInfo">
                        <div className="temperature">{this.ConvertTemperature(this.props.temp)}<span>&deg;</span></div>
                        <div className="description">    
                        <div className="weatherCondition">                        {this.props.icon}</div>    
                        <div className="place">{this.props.timezone}</div>
                        </div>
                    </div>
                <div className="date">{this.convertDate(this.props.date)}</div>
                </div>
        );
    }
}

export default Widget;
