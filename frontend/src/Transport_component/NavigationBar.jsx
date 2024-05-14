import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from './logo.png'; 
import './NavigationBar.css';
const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded border border-secondary" >
        <Link to="/" className="navbar-brand"><img style={{ width: '150px', height: '50px' }} src={logoImage} alt="Your Logo" /></Link>
       
        <div  >
          <h1 style={{marginLeft:'10%'}}>Transport Management - Seylin Garments</h1>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;