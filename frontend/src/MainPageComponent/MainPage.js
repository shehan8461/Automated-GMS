import React, { useState } from 'react';
import './header.css';
import logo1 from './1.jpg';
import logo2 from './2.png';
import logo3 from './3.jpg';
import logo4 from './more1.jpg';
import logo5 from './more2.jpg';
import logo6 from './more3.jpg';

function MainPage() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleImageClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
             <body className='backgroundMain'>
            <nav>
                <ul>
                    <li><a href="/marketing">Marketing Management</a></li>
                    <li><a href="/count">Supplier Management</a></li>
                    <li><a href="/Inventory">Inventory Management</a></li>
                    <li><a href="/sales">Sales Management</a></li>
                    <li><a href="/">Human Resources</a></li>
                </ul>
            </nav>
            <div className="container">
                <h1><b>Welcome to the Automated Garment Management System of Selyn</b></h1><br></br><br></br>
             
                <div className="image-hover-container">
                    {[logo1, logo2, logo3].map((logo, index) => (
                        <div 
                            key={index} 
                            className={`image-hover ${activeIndex === index ? 'active' : ''}`} 
                            onClick={() => handleImageClick(index)}
                        >
                            <img src={logo} alt={`Garment ${index + 1}`} />
                            <p>
                                {index === 0 && "Discover authentic and ethically handcrafted gifts from our latest arrivals. Each piece is made with the utmost care by skilled artisans."}
                                {index === 1 && "Embark on a journey to discover the authentic art of handloom weaving and fair-trade practices. Join our fair-trade family and witness the transparency and passion that goes into creating our products."}
                                {index === 2 && "Empowering artisans, changing lives through sustainable handloom products. Discover the story of Selyn, Sri Lanka's fair trade social enterprise."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <p id="newarrivels">
                New arrival emails are a type of product promotion email: typically, <br></br>they focus on one new product & the product details.<br></br> They can also be used for new collection releases for, say, a clothing retailer. <br></br>The goal of these emails is to drive demand for new products.<br></br>
            </p>
            <img src={logo5} alt="more1" width="20%" height="20%" id="more1"/>
            <img src={logo4} alt="more2" width="16%" height="30%" id="more2"/>
            <img src={logo6} alt="more2" width="20%" height="20%" id="more3"/>
            <footer>
                <div className="footer-content">
                    <p>&copy; 2024 Garment Management System. All rights reserved.</p>
                    <div className="footer-details">
                        <div className="contact-info">
                            <p><strong>Contact Us:</strong></p>
                            <p>Email:Seylin@garmentsystem.com</p>
                            <p>Phone: +1 234 567 890</p>
                        </div>
                        <div className="social-media">
                            <p><strong>Follow Us:</strong></p>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                        <div className="additional-links">
                            <p><strong>Quick Links:</strong></p>
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/contact">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>
            </body>
        </div>
    );
}

export default MainPage;
