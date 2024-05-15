import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './logo.png'; 
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <div>
      <nav style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '0.25rem', 
        border: '1px solid #6c757d', 
        padding: '0.5rem 1rem' 
      }}>
        <Link to="/" className="navbar-brand">
          <img 
            style={{ width: '150px', height: '50px' }} 
            src={logoImage} 
            alt="Your Logo" 
          />
        </Link>
        <div>
          <h1 style={{ marginLeft: '10%', fontSize: '1.5rem', margin: 0 }}>Transport Management - Seylin Garments</h1>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
