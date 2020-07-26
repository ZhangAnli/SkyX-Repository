import React from 'react'; 
import './pages.css'; 
import Navbar from '../components/navbar';
import { Container } from '@material-ui/core'
import PriceAlertForm from '../components/pricealertform'; 

//Price Alert Form 
class Pricealert extends React.Component  {

    state = { 
      fields: {}
    }; 
  
   onSubmit = fields => {
     this.setState({ fields }); 
   }; 
   render() { 
    return (
      <div> 
          <Navbar/>
          <h1> Price Alert  </h1>
          <hr></hr>
          <Container className="featuresExplainer">Price Alert is a function where you can place an alert that will notify you once your alert price has been hit.
          </Container>
          <PriceAlertForm /> 

        </div>
    );
  }
}

export default Pricealert; 
