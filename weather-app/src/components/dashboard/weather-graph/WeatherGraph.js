import React, { Component } from 'react';
import './WeatherGraph.css';
import Requester from '../../../utils/requester';
import Widgetd from '../widget/Widget';
class WeatherGraph extends Component{

    state = {
        search: "Sofia",
        text: {
            searchCity: "Search City",
            search: "Search"
        },
    }

    RequestCityData = async () => {
        let searchQery = this.state.search;
        let hash = sessionStorage.getItem('hash');
        let result = null;
        try{
            result = await Requester(`/weather`, 'POST',{city: searchQery},{authorization: hash});
            this.setState(result);
        }catch(e){
            console.log(e);
        }
    }

    handleSearch= (e) => {
        this.setState({search: e.target.value});
    }

    componentDidMount= () => {
        this.RequestCityData();
    }

    render(){

        return(
            <div>
               <div className="search-container">
                <input type="text" className="search" value={this.state.search} onChange={this.handleSearch} placeholder={this.state.text.searchCity}>
                </input><button className="search-button" onClick={this.RequestCityData} >{this.state.text.search}</button>
            </div>
            <div className="widget-container">
                {this.state.daily ? this.state.daily.map(item => {
                return <Widgetd date={item.dt} temp={item.temp.max} timezone={this.state.timezone} weather={item.weather[0].main}></Widgetd>}) : ""}
            </div>
            </div>
        )
    }
}

export default WeatherGraph;
