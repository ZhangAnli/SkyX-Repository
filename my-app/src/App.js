import React from 'react';
import './index.css'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

//pages imports
import Home from './pages/home'; 
import Destinationcomparison from './pages/destinationcomparison';
import Pricemap from './pages/pricemap';
import Pricechart from './pages/pricechart';
import Pricealert from './pages/pricealert'; 

function App() {
  return (
    <div>
      {/* Navbar Routing */}
      <Router> 
        <Switch>
          <Route path ="/" exact component={Home} /> 
          <Route path ="/destinationcomparison" component={Destinationcomparison} />
          <Route path ="/pricemap" component={Pricemap} />
          <Route path ="/pricechart" component={Pricechart} />
          <Route path ="/buyorder" component={Pricealert} />
        </Switch>
      </Router>  

    </div>
  );
}

export default App;