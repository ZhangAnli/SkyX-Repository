import React from 'react'; 
import './pages.css'; 
import Navbar from '../components/navbar';
import London from '../destinations/London';
import Tokyo from '../destinations/Tokyo';
import KualaLumpur from '../destinations/KualaLumpur';
import Bali from '../destinations/Bali';
import HongKong from '../destinations/HongKong';
import { db } from '../components/firebase';
import ComparisonTable from './comparisontable';

function cityPicker(city) {
    if (city === "Tokyo") {
      return "TYO";
    } else if (city === "Bali") {
      return "DPS";
    } else if (city=== "London") {
      return "LON";
    } else if (city === "Hong Kong") {
      return "HKG";
    } else if (city === "-Select Destination-") {
      return "NONE";
    } else {
      return "KUL";
    }
}

async function getFirebaseData(city) {
    const document = await db.collection('flight_price_' + city).doc("Prices").get();
    const all_time_average = await document.get("All Time Average"); 
    // console.log(all_time_average); 
    const all_time_high = await document.get("All Time High");
    // console.log(all_time_high); 
    const all_time_low = await document.get("All Time Low");
    const monthly_average = await document.get("Monthly Average");
    const monthly_high = await document.get("Monthly High");
    const monthly_low = await document.get("Monthly Low");
    var output_arr = [];
    output_arr[0] = all_time_average.toFixed(2);
    output_arr[1] = all_time_high; 
    output_arr[2] = all_time_low; 
    output_arr[3] = monthly_average.toFixed(2);
    output_arr[4] = monthly_high;
    output_arr[5] = monthly_low;
    return output_arr;
}

class Destinationcomparison extends React.Component { 
    state = {
        firstSelected : '',
        secondSelected : '',
        firstCity : {
            all_time_average: '', 
            all_time_high: '', 
            all_time_low: '',
            monthly_average: '',
            monthly_high: '',
            monthly_low: ''
        }, 
        secondCity : {
            all_time_average: '', 
            all_time_high: '', 
            all_time_low: '',
            monthly_average: '',
            monthly_high: '',
            monthly_low: ''
        }
    }
    render() {
        console.log(this.state.firstSelected);
        return ( 
            <div> 
                <Navbar /> 
                <h1> Destination Comparison </h1>
                <hr/>
                <div id="comparisonTable">
                    <div className="comparison">
                        {this.renderFirstCardSelection()}
                        {this.renderSelectedCard(this.state.firstSelected)}
                    </div>
                    <div className="comparison">
                        <h1>VS</h1>
                    </div>
                    <div className="comparison">
                        {this.renderSecondCardSelection()}
                        {this.renderSelectedCard(this.state.secondSelected)}
                    </div>
                </div>
                <ComparisonTable 
                    firstSelected={this.state.firstSelected}
                    secondSelected={this.state.secondSelected}
                    firstCity={this.state.firstCity}
                    secondCity={this.state.secondCity}/>
            </div>
        );
    }

    async updateFirstSelected(e) {
        this.setState({firstSelected: e.target.value});
        var city = cityPicker(e.target.value);
        console.log(city);
        if (city === "NONE") {
            console.log("hit");
            this.setState({ 
                firstCity : {
                    all_time_average: "", 
                    all_time_high: "", 
                    all_time_low: "",
                    monthly_average: "",
                    monthly_high: "",
                    monthly_low: ""
                }
            })
        } else {
            var all_time_prices = await getFirebaseData(city).catch(err => console.log("Oops error"));
            this.setState({ 
                firstCity : {
                    all_time_average: all_time_prices[0], 
                    all_time_high: all_time_prices[1], 
                    all_time_low: all_time_prices[2],
                    monthly_average: all_time_prices[3],
                    monthly_high: all_time_prices[4],
                    monthly_low: all_time_prices[5]
                }
            })
        }
        
        // console.log(all_time_prices);
    }

    async updateSecondSelected(e) {
        this.setState({secondSelected: e.target.value});
        var city = cityPicker(e.target.value);
        if (city === "NONE") {
            this.setState({ 
                secondCity : {
                    all_time_average: "", 
                    all_time_high: "", 
                    all_time_low: "",
                    monthly_average: "",
                    monthly_high: "",
                    monthly_low: ""
                }
            })
        } else {
            var all_time_prices = await getFirebaseData(city).catch(err => console.log("Oops error"));
            this.setState({ 
                secondCity : {
                    all_time_average: all_time_prices[0], 
                    all_time_high: all_time_prices[1], 
                    all_time_low: all_time_prices[2],
                    monthly_average: all_time_prices[3],
                    monthly_high: all_time_prices[4],
                    monthly_low: all_time_prices[5]
                }
            })
        }
        // console.log(all_time_prices);
    }

    renderFirstCardSelection() {
        return(
            <div className="form-group top-margin-small">
                <label className="card-selector-label">Select Destination</label>
                <select className="card-selector form-control" onChange={(e) => this.updateFirstSelected(e)}>
                    <option>-Select Destination-</option>
                    <option>Bali</option>
                    <option>Hong Kong</option>
                    <option>Kuala Lumpur</option>
                    <option>London</option>
                    <option>Tokyo</option>
                </select>
            </div>
        );
    }

    renderSecondCardSelection() {
        return(
            <div className="form-group top-margin-small">
                <label className="card-selector-label">Select Destination</label>
                <select className="card-selector form-control" onChange={(e) => this.updateSecondSelected(e)}>
                    <option>-Select Destination-</option>
                    <option>Bali</option>
                    <option>Hong Kong</option>
                    <option>Kuala Lumpur</option>
                    <option>London</option>
                    <option>Tokyo</option>
                </select>
            </div>
        );
    }

    renderSelectedCard(selected) {
        if (selected === "London") {
            return(<London />);
        } else if (selected === "Tokyo") {
            return(<Tokyo />);
        } else if (selected === "Hong Kong") {
            return(<HongKong />);
        } else if (selected === "Bali") {
            return(<Bali />);
        } else if (selected === "Kuala Lumpur") {
            return(<KualaLumpur />);
        } else {
            return(
                <div>
                    <h1>NOT SELECTED</h1>
                </div>
            )
        }
    }
}


export default Destinationcomparison; 