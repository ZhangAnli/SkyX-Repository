import React from 'react'; 
import logo from '../images/navbarlogo.png'; 
import './components.css'; 


function Navbar (){ 
    
    return (
    <div className="container center">

    <nav className="menu">
        <h1 style ={{
            backgroundImage: 'url(' + logo + ')'

        }} className="menu__logo">SkyX</h1>

        <div className="menu__right">
            <ul className="menu__list">
                <li className="menu__list-item"><a className="menu__link menu__link--active" href="/">Home</a></li>
                <li className="sub-menu menu__list-item"><a className="menu__link" href="/pricechart">Price Chart</a></li>
                <li className="menu__list-item"><a className="menu__link" href="/pricemap">Price Maps</a></li>
                <li className="menu__list-item"><a className="menu__link" href="/destinationcomparison">Destination Comparison</a></li>
                <li className="menu__list-item"><a className="menu__link" href="/buyorder">Price Alert</a></li>
            </ul>

        </div>
    </nav>

    </div>
    ); 
} 
  

export default Navbar; 
