import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container}  from '@material-ui/core'; 

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
});

class ChartDescription extends React.Component {  
  render() {
    const { classes } = this.props; 
    return(
      <div className={ classes.root }>
        <Paper id="ChartData" elevation={5}> 
            <Container> 
              <h1 id="heading"> Chart Data </h1>
              <div> All Time Average: ${ this.props.all_time_average }</div><hr className = "chartDataLine" />
              <div> All Time High: ${ this.props.all_time_high }</div><hr className = "chartDataLine" />
              <div> All Time Low: ${ this.props.all_time_low }</div><hr className = "chartDataLine" />
              <div> All Time Price Range: ${ this.props.all_time_low } - ${ this.props.all_time_high } </div><hr className = "chartDataLine" />
              <div> This Month's Average: ${ this.props.monthly_average }</div><hr className = "chartDataLine" />
              <div> This Month's High: ${ this.props.monthly_high }</div><hr className = "chartDataLine" />
              <div> This Month's Low: ${ this.props.monthly_low }</div><hr className = "chartDataLine" />
              <div> This Month's Price Range: ${ this.props.monthly_low } - ${ this.props.monthly_high }</div><hr className = "chartDataLine" />
              <div> Upward Volatility: { this.props.upward_vol }%</div><hr className = "chartDataLine" />
              <div> Downward Volatility: { this.props.downward_vol }%</div>
            </Container>
        </Paper> 
      </div>
    );
  }
}

export default withStyles(useStyles)(ChartDescription);