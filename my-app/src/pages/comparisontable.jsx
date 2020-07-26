import React from 'react';
import { withStyles} from '@material-ui/core'; 


const useStyles = theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  });

class ComparisonTable extends React.Component {
    invisibleDefault(data) {
        if (data === '') {
            return '';
        } else {
            return '$' + data;
        }
    }
    render() {

        return(
            <div>
              <div className="comparisonRow">
                  <div id="comparisonLeft1">{this.invisibleDefault(this.props.firstCity.all_time_average)}</div>
                  <div className="comparisonCentre">All Time Average</div>
                  <div id="comparisonRight1">{this.invisibleDefault(this.props.secondCity.all_time_average)}</div>
              </div>
              <hr className = "chartDataLine" />
              <div className="comparisonRow">
                  <div id="comparisonLeft2">{this.invisibleDefault(this.props.firstCity.all_time_high)}</div>
                  <div className="comparisonCentre">All Time High</div>
                  <div id="comparisonRight2">{this.invisibleDefault(this.props.secondCity.all_time_high)}</div>
              </div>
              <hr className = "chartDataLine" />
              <div className="comparisonRow">
                  <div id="comparisonLeft3">{this.invisibleDefault(this.props.firstCity.all_time_low)}</div>
                  <div className="comparisonCentre">All Time Low</div>
                  <div id="comparisonRight3">{this.invisibleDefault(this.props.secondCity.all_time_low)}</div>
              </div>
              <hr className = "chartDataLine" />
              <div className="comparisonRow">
                  <div id="comparisonLeft4">{this.invisibleDefault(this.props.firstCity.monthly_average)}</div>
                  <div className="comparisonCentre">This Month's Average</div>
                  <div id="comparisonRight4">{this.invisibleDefault(this.props.secondCity.monthly_average)}</div>
              </div>
              <hr className = "chartDataLine" />
              <div className="comparisonRow">
                  <div id="comparisonLeft5">{this.invisibleDefault(this.props.firstCity.monthly_high)}</div>
                  <div className="comparisonCentre">This Month's High</div>
                  <div id="comparisonRight5">{this.invisibleDefault(this.props.secondCity.monthly_high)}</div>
              </div>
              <hr className = "chartDataLine" />
              <div className="comparisonRow">
                  <div id="comparisonLeft6">{this.invisibleDefault(this.props.firstCity.monthly_low)}</div>
                  <div className="comparisonCentre">This Month's Low</div>
                  <div id="comparisonRight6">{this.invisibleDefault(this.props.secondCity.monthly_low)}</div>
              </div>
              <hr className = "chartDataLine" />
            </div>
        );
    }
}

export default withStyles(useStyles)(ComparisonTable);