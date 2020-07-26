import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core'; 
import './components.css';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Grid id="feature" container spacing={3} justify="center">
        <Grid className ="featuresGrid" item ={true} xs={2}>
            <Card className={classes.root} variant="outlined">
            <CardContent className ="features">
                <Typography className="featTextHeader" variant="h6" component="h1">
                Price Charts
                </Typography>
                <Typography className="featText" color="textSecondary">
                Price Charts on SkyX serves as the tracking engine for users to automatically track flight prices. Besides historical data, it also has future flight prices for any destination. 
                </Typography>
            </CardContent>
            <CardActions>
                <Button className ="featureButtons" justify-content="center" size="small"><a href='/pricechart'>Try now</a></Button>
            </CardActions>
            </Card>
        </Grid>

        <Grid className ="featuresGrid" item ={true} xs={2}>
            <Card className={classes.root} variant="outlined">
            <CardContent className ="features">
                <Typography className="featTextHeader" variant="h6" component="h1">
                Price Maps 
                </Typography>
                <Typography className="featText" color="textSecondary">
                Price Maps from SkyX allows you to have a visual representation of air ticket prices on a global map, allowng you to find the cheapest tickets in any area at one glance. 
                </Typography>
            </CardContent>
            <CardActions>
                <Button className ="featureButtons" justify-content="center" size="small"><a href='/pricemap'>Try now</a></Button>
            </CardActions>
            </Card>
        </Grid>

        <Grid className ="featuresGrid" item ={true} xs={2} >
            <Card className={classes.root} variant="outlined">
            <CardContent className ="features">
                <Typography className="featTextHeader" variant="h6" component="h1">
                Destination Comparison
                </Typography>
                <Typography className="featText" color="textSecondary">
                Destination Comparison provides users with a side-by-side comparison of flight prices to two different destinations. It provides users with a clearer understanding between the two.  
                </Typography>
            </CardContent>
            <CardActions>
                <Button className ="featureButtons" justify-content="center" size="small"><a href='/pricecomparison'>Try now</a></Button>
            </CardActions>
            </Card>
        </Grid>

        <Grid className ="featuresGrid" item ={true} xs={2} >
            <Card className={classes.root} variant="outlined">
            <CardContent className ="features">
                <Typography className="featTextHeader" variant="h6" component="h1">
                Price Alert 
                </Typography>
                <Typography className="featText" color="textSecondary">
                Price Alert Order is a function where users can place a specified price. Once the tracking engine determines the price is achieved, an automated email notification will be sent. 
                </Typography>
            </CardContent>
            <CardActions>
                <Button className ="featureButtons" justify-content="center" size="small"><a href='/buyorder'>Try now</a></Button>
            </CardActions>
            </Card>
        </Grid>

    </Grid>

  );
}