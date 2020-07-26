import React from 'react'; 
import'./pages.css'; 
import Navbar from '../components/navbar';
import Map from '../components/mapbox'; 
function Pricemap () { 
    return ( 
        <div> 
            <Navbar /> 
            <h1> Price Map </h1>
            <hr/>
            
            <div className="featuresExplainer">Price Maps from SkyX allows you to have a visual representation of air ticket prices on a global map, allowing you to find the cheapest tickets in any area at one glance. 
            </div>
            <Map />
        </div>
    ); 
}

export default Pricemap; 