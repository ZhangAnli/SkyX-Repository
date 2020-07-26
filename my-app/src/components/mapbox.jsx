import React, {Component} from 'react'; 
import ReactDOM from 'react-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Paper }  from '@material-ui/core'; 
import { db } from './firebase'; 
import "./components.css"
import 'mapbox-gl/dist/mapbox-gl.css'

// 1. Dependency Functions
async function MonthlyAverage(city) {
  const document = await db.collection('flight_price_' + city).doc("Prices").get();
  const monthly_average = await document.get("Monthly Average"); 
  return monthly_average;
}

async function AllTimeAverage(city) {
    const document = await db.collection('flight_price_' + city).doc("Prices").get();
    const all_time_average = await document.get("All Time Average"); 
    return all_time_average;
}

// 2. Component
class Map extends Component {
    
    _isMounted = false; 

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 1.290270,
                longitude: 103.851959,
                width: "100vw",
                height: "60vh",
                zoom: 2
              }, 
            isLoading: true, 
            selectedCountry: null, 
            selectedMonthlyAverage: 0, 
            selectedAllTimeAverage: 0, 
            selectedLatitude: 0, 
            selectedLongitude: 0, 
            TYO_MAverage: 0, 
            TYO_ATAverage: 0,
            HKG_MAverage: 0, 
            HKG_ATAverage: 0,
            LON_MAverage: 0, 
            LON_ATAverage: 0,
            KUL_MAverage: 0, 
            KUL_ATAverage: 0,
            DPS_MAverage: 0, 
            DPS_ATAverage: 0,
        };
    }

    // Pop-up Event Listener 
    async componentDidMount () {
        
        this._isMounted = true; 

        var tokyo_MAverage = await MonthlyAverage("TYO");
        var tokyo_ATAverage = await AllTimeAverage("TYO"); 
        var hongkong_MAverage = await MonthlyAverage("HKG");
        var hongkong_ATAverage = await AllTimeAverage("HKG"); 
        var london_MAverage = await MonthlyAverage("LON");
        var london_ATAverage = await AllTimeAverage("LON"); 
        var kualalumpur_MAverage = await MonthlyAverage("KUL");
        var kualalumpur_ATAverage = await AllTimeAverage("KUL"); 
        var denpasar_MAverage = await MonthlyAverage("DPS");
        var denpasar_ATAverage = await AllTimeAverage("DPS"); 

        if (this._isMounted){ 
        this.setState({
            TYO_MAverage: Math.floor(tokyo_MAverage), 
            TYO_ATAverage: Math.floor(tokyo_ATAverage), 
            HKG_MAverage: Math.floor(hongkong_MAverage), 
            HKG_ATAverage: Math.floor(hongkong_ATAverage), 
            LON_MAverage: Math.floor(london_MAverage), 
            LON_ATAverage: Math.floor(london_ATAverage), 
            KUL_MAverage: Math.floor(kualalumpur_MAverage), 
            KUL_ATAverage: Math.floor(kualalumpur_ATAverage), 
            DPS_MAverage: Math.floor(denpasar_MAverage), 
            DPS_ATAverage: Math.floor(denpasar_ATAverage), 
            isLoading: false
            });
        } 
        
        const listener = e => {
            if (e.key === "Escape") {
                this.setState({
                    selectedCountry: null
                });
            } 
        }; 

        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render () {
        return (
        <div>
        <ReactMapGL 
        {...this.state.viewport} 
        mapboxApiAccessToken={"pk.eyJ1IjoiYW5sZWVlIiwiYSI6ImNrYjM0MmJ1aDBoYWQyeGs2cm43bGlqdzUifQ.QsauNU7FFlsWYn-HbF2D8w"}
        mapStyle="mapbox://styles/anleee/ckb4n5bon1pct1is727fqbnpl"
        onViewportChange={change => {
            this.setState({ 
                viewport: change
            })
        }}
        > 
        <Marker 
            id="TYO"
            className="marker"
            key={1}
            latitude={35.6894}
            longitude={139.6917}
            position="absolute"
        > 
            <button
                position="absolute"
                className="marker-btn"
                id="TYO"
                onClick={e => {
                    e.preventDefault();
                    this.setState({
                        selectedCountry: "Tokyo", 
                        selectedAllTimeAverage: this.state.TYO_ATAverage,
                        selectedMonthlyAverage: this.state.TYO_MAverage,
                        selectedLatitude: 35.6894, 
                        selectedLongitude: 139.6917
                        })
                    }
                }
                >
                <img src={
                this.state.TYO_MAverage < this.state.TYO_ATAverage
                ?  this.state.TYO_ATAverage - this.state.TYO_MAverage > 0.15 * this.state.TYO_ATAverage 
                    ? "https://ya-webdesign.com/transparent250_/pins-vector-green-5.png"
                    : "https://ya-webdesign.com/transparent250_/pins-vector-black-3.png"
                : "https://ya-webdesign.com/transparent250_/pins-vector-red-5.png"
                }
                alt="Map Marker Icon" />
                </button>
        </Marker>

        <Marker 
            id="HKG"
            className="marker"
            key={2}
            latitude={22.3193}
            longitude={114.1694}
        > 
            <button
                position="absolute"
                className="marker-btn"
                id="HKG"
                onClick={e => {
                    e.preventDefault();
                    this.setState({
                        selectedCountry: "Hong Kong", 
                        selectedAllTimeAverage: this.state.HKG_ATAverage,
                        selectedMonthlyAverage: this.state.HKG_MAverage,
                        selectedLatitude: 22.3193, 
                        selectedLongitude: 114.1694
                        })
                    }
                }
                >
                <img src={
                this.state.HKG_MAverage < this.state.HKG_ATAverage
                ?  this.state.HKG_ATAverage - this.state.HKG_MAverage > 0.15 * this.state.HKG_ATAverage 
                    ? "https://ya-webdesign.com/transparent250_/pins-vector-green-5.png"
                    : "https://ya-webdesign.com/transparent250_/pins-vector-black-3.png"
                : "https://ya-webdesign.com/transparent250_/pins-vector-red-5.png"
                }
                alt="Map Marker Icon" />
                </button>
        </Marker>

        <Marker 
            id="LON"
            className="marker"
            key={3}
            latitude={51.5074}
            longitude={0.1278}
        > 
            <button
                position="absolute"
                className="marker-btn"
                id="LON"
                onClick={e => {
                    e.preventDefault();
                    this.setState({
                        selectedCountry: "London", 
                        selectedAllTimeAverage: this.state.LON_ATAverage,
                        selectedMonthlyAverage: this.state.LON_MAverage,
                        selectedLatitude: 51.5074, 
                        selectedLongitude: 0.1278
                        })
                    }
                }
                >
                <img src={
                this.state.LON_MAverage < this.state.LON_ATAverage
                ?  this.state.LON_ATAverage - this.state.LON_MAverage > 0.15 * this.state.LON_ATAverage 
                    ? "https://ya-webdesign.com/transparent250_/pins-vector-green-5.png"
                    : "https://ya-webdesign.com/transparent250_/pins-vector-black-3.png"
                : "https://ya-webdesign.com/transparent250_/pins-vector-red-5.png"
                }
                alt="Map Marker Icon" />
                </button>
        </Marker>

        <Marker 
            id="KUL"
            className="marker"
            key={4}
            latitude={3.1390}
            longitude={101.6869}
        > 
            <button
                position="absolute"
                className="marker-btn"
                id="KUL"
                onClick={e => {
                    e.preventDefault();
                    this.setState({
                        selectedCountry: "Kuala Lumpur", 
                        selectedAllTimeAverage: this.state.KUL_ATAverage,
                        selectedMonthlyAverage: this.state.KUL_MAverage,
                        selectedLatitude: 3.1390, 
                        selectedLongitude: 101.6869
                        })
                    }
                }
                >
                <img src={
                this.state.KUL_MAverage < this.state.KUL_ATAverage
                ?  this.state.KUL_ATAverage - this.state.KUL_MAverage > 0.15 * this.state.KUL_ATAverage 
                    ? "https://ya-webdesign.com/transparent250_/pins-vector-green-5.png"
                    : "https://ya-webdesign.com/transparent250_/pins-vector-black-3.png"
                : "https://ya-webdesign.com/transparent250_/pins-vector-red-5.png"
                }
                alt="Map Marker Icon" />
                </button>
        </Marker>

        <Marker 
            id="DPS"
            className="marker"
            key={5}
            latitude={-8.3405}
            longitude={115.0920}
        > 
            <button
                position="absolute"
                className="marker-btn"
                id="DPS"
                onClick={e => {
                    e.preventDefault();
                    this.setState({
                        selectedCountry: "Bali", 
                        selectedAllTimeAverage: this.state.DPS_ATAverage,
                        selectedMonthlyAverage: this.state.DPS_MAverage,
                        selectedLatitude: -8.3405, 
                        selectedLongitude: 115.0920
                        })
                    }
                }
                >
                <img src={
                this.state.DPS_MAverage < this.state.DPS_ATAverage
                ?  this.state.DPS_ATAverage - this.state.DPS_MAverage > 0.15 * this.state.DPS_ATAverage 
                    ? "https://ya-webdesign.com/transparent250_/pins-vector-green-5.png"
                    : "https://ya-webdesign.com/transparent250_/pins-vector-black-3.png"
                : "https://ya-webdesign.com/transparent250_/pins-vector-red-5.png"
                }
                alt="Map Marker Icon" />
                </button>
        </Marker>
        
        {this.state.selectedCountry ? (
        <Popup 
            className="popup"
            latitude={this.state.selectedLatitude}
            longitude={this.state.selectedLongitude}
            onClose={() => {
                this.setState({ 
                    selectedCountry: null, 
                    selectedLatitude: null, 
                    selectedLongitude: null
                })
                }
            }
        >
            <div>
            <span className="header">{this.state.selectedCountry}</span><hr/>
            <span className="body">Month Average: </span>
            <span className="value">${this.state.selectedMonthlyAverage}</span><br/>
            <span className="body">All Time Average: </span>
            <span className="value">${this.state.selectedAllTimeAverage}</span>
            </div>
        </Popup>
        ) : null}

            <Paper className="legend" elevation={3} variant="outlined" >
                <img className="legendPics" height="20px" src="https://ya-webdesign.com/transparent250_/pins-vector-green-5.png" alt="green marker "/> <strong>Cheap</strong>  <br/>
                <img className="legendPics" height="20px" src="https://ya-webdesign.com/transparent250_/pins-vector-black-3.png" alt="green marker "/> <strong>Average</strong>  <br/>
                <img className="legendPics" height="20px" src="https://ya-webdesign.com/transparent250_/pins-vector-red-5.png" alt="green marker "/> <strong>Expensive</strong><br/>
            </Paper>

        </ReactMapGL>
        </div>
        );
    }
}

ReactDOM.render(<Map />, document.getElementById('root')); 

export default Map; 