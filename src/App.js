import React, { Component } from "react";
import "./App.css";
import "./loading.css";

const PLACES = [
    { name: "Barkingside Stn", zip: "CarParks_800491" },
    { name: "Buckhurst Hill Stn", zip: "CarParks_800468" },
    { name: "Fairlop Stn", zip: "CarParks_800475" },
    { name: "Greenford Stn", zip: "CarParks_800444" },
    { name: "Hainault Stn", zip: "CarParks_800477" },
    { name: "Leytonstone Stn", zip: "CarParks_800481" },
    { name: "Perivale Stn", zip: "CarParks_800456" }
];

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            parkData: null
        };
    }
    componentDidMount() {
        const zip = this.props.zip;
        const URL = "https://api.tfl.gov.uk/Occupancy/CarPark/"+zip;
        fetch(URL).then(res => res.json()).then(json => {
            console.log(json)
            this.setState({ parkData: json });
        });
    }
    render() {
        const parkData = this.state.parkData;
        if (!parkData) return <div id="circularG">
            <div id="circularG_1" className="circularG"> </div>
            <div id="circularG_2" className="circularG"> </div>
            <div id="circularG_3" className="circularG"> </div>
            <div id="circularG_4" className="circularG"> </div>
            <div id="circularG_5" className="circularG"> </div>
            <div id="circularG_6" className="circularG"> </div>
            <div id="circularG_7" className="circularG"> </div>
            <div id="circularG_8" className="circularG"> </div>
        </div>;
        return (
            <div>
                <h1 className="App-logo">
                    The occupancy for a car park {parkData.name}
                </h1>
                <div className="box content">
                    <p>Type: {parkData.bays[0].bayType}</p>
                    <p>Count: {parkData.bays[0].bayCount}</p>
                    <p>Free: {parkData.bays[0].free}</p>
                    <p>Occupied: {parkData.bays[0].occupied}</p>
                </div>
                <div className="box">
                    <p>Type: {parkData.bays[1].bayType}</p>
                    <p>Count: {parkData.bays[1].bayCount}</p>
                    <p>Free: {parkData.bays[1].free}</p>
                    <p>Occupied: {parkData.bays[1].occupied}</p>
                </div>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0
        };
    }
    render() {
        const activePlace = this.state.activePlace;
        return (
            <div className="App">
                    <div>
                    {PLACES.map((place, index) => (
                        <a className="box"
                            key={index}
                            onClick={() => {
                                this.setState({ activePlace: index });
                            }}
                        >
                            {place.name}
                        </a>
                    ))}
                </div>
                <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
                </div>
        );
    }
}

export default App;