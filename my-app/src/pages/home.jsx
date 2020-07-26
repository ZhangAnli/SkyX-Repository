import React from 'react';
import '../index.css'; 

//component imports 
import Logo from '../components/logo'; 
import Navbar from '../components/navbar';
import Recommendations from '../components/recommendations';
import Features from '../components/features'; 

function Home() {
  return (
    <div>

    {/* Navbar */}
    <Navbar />

    {/* Logo */}
    <Logo /> 

    {/* Recommendations */}
    <Recommendations />

    <h1 className="sections" id="featuresHeader"> Features</h1>
    <hr></hr>
    <Features /> 
    
    </div>
  );
}

export default Home;