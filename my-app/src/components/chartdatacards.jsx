import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'; 
import { db } from './firebase';
import ChartDescription from './chartdescription'

function cityPicker(city) {
    if (city === "Tokyo") {
      return "TYO";
    } else if (city === "Bali") {
      return "DPS";
    } else if (city=== "London") {
      return "LON";
    } else if (city === "Hong Kong") {
      return "HKG";
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
    const upward_vol = await document.get("Upward Volatility");
    const downward_vol = await document.get("Downward Volatility");
    var output_arr = [];
    output_arr[0] = all_time_average.toFixed(2);
    output_arr[1] = all_time_high; 
    output_arr[2] = all_time_low; 
    output_arr[3] = monthly_average.toFixed(2);
    output_arr[4] = monthly_high;
    output_arr[5] = monthly_low;
    output_arr[6] = upward_vol.toFixed(2);
    output_arr[7] = downward_vol.toFixed(2);
    return output_arr;
}

 class ChartDataCards extends React.Component {
    constructor() { 
        super(); 
        this.state={ 
            all_time_average: '', 
            all_time_high: '', 
            all_time_low: '',
            monthly_average: '',
            monthly_high: '',
            monthly_low: '',
            upward_vol: '',
            downward_vol: ''
        }; 
    }m
  
  async componentDidMount() { 
    const city = cityPicker(this.props.name);
    var all_time_prices = await getFirebaseData(city).catch(err => console.log("Oops error"));
    this.setState({ 
        all_time_average: all_time_prices[0], 
        all_time_high: all_time_prices[1], 
        all_time_low: all_time_prices[2],
        monthly_average: all_time_prices[3],
        monthly_high: all_time_prices[4],
        monthly_low: all_time_prices[5],
        upward_vol: all_time_prices[6],
        downward_vol: all_time_prices[7]
      })
  }

  render(){
    return (
        <div>
          <Grid id="card" container spacing={3} justify="center">
              <Card variant="outlined" >
                  <CardContent id="alltimeavg">
                      <Typography variant="h4" component="h1">
                        Average Price:
                      </Typography>
                  </CardContent>
                  <CardActions id="alltimebody">
                      <h2>${ this.state.all_time_average }</h2>
                  </CardActions>
              </Card>
              <Card variant="outlined">
                  <CardContent id="alltimehigh">
                      <Typography variant="h4" component="h1">
                        Highest Price:
                      </Typography>
                  </CardContent>
                  <CardActions id="alltimebody">
                      <h2>${ this.state.all_time_high }</h2>
                  </CardActions>
              </Card>
              <Card variant="outlined">
                  <CardContent id="alltimelow">
                      <Typography variant="h4" component="h1">
                        Lowest Price:
                      </Typography>
                  </CardContent>
                  <CardActions id="alltimebody">
                      <h2>${ this.state.all_time_low }</h2>
                  </CardActions>
              </Card>
          </Grid>
          <ChartDescription 
            all_time_average={ this.state.all_time_average } 
            all_time_low={ this.state.all_time_low } 
            all_time_high={ this.state.all_time_high }
            monthly_average={ this.state.monthly_average }
            monthly_high={ this.state.monthly_high }
            monthly_low={ this.state.monthly_low }
            upward_vol={ this.state.upward_vol }
            downward_vol={ this.state.downward_vol }
            />
        </div>
        );
    } 
}

export default ChartDataCards; 