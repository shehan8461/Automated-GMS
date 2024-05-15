import React from 'react';
import './header.css';
import logo1 from './1.jpg'
import logo2 from './2.png'
import logo3 from './3.jpg'

function MainPage() {
    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/marketing">Marketing Management</a></li>
                    <li><a href="/count">Supplier Management</a></li>
                    <li><a href="/">Inventory Management</a></li>
                    <li><a href="/">Sales Management</a></li>
                    <li><a href="/">Human Resources</a></li>
                </ul>
            </nav>
            <div className="container">
                <h1>Welcome to the Garment Management System</h1>
                <p>Manage your garment business efficiently with our comprehensive system.</p>
                <div className="image-hover-container">
                    <div className="image-hover">
                        <img src={logo1} alt="Garment 1"/>
                        <p>Garment 1</p>
                    </div>
                    <div className="image-hover">
                        <img src={logo2} alt="Garment 2"/>
                        <p>Garment 2</p>
                    </div>
                    <div className="image-hover">
                        <img src={logo3} alt="Garment 3"/>
                        <p>Garment 3</p>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2024 Garment Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default MainPage;
