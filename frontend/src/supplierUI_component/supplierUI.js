import React from 'react';
import './supplierUI.css'; 

function SupplierUI(){
    const handleAcceptClick = () => {
        alert('Order Accepted!');
    };

    const handleRejectClick = () => {
        alert('Order Rejected!');
    };

    return (
        <div>
            <body className='supplierUI_background'>
                <div className="container_supUI">
                    <h1>Hello Mr Saman. Welcome Back!</h1>
                    <div className="order-details">
                        <h2>Order Details</h2>
                        <p>Product: Elastics </p>
                        <p>Order Amount: 500</p>
                        <p>Order Date: 06/05/2024</p>
                    </div>
                    <div className="button-container">
                        <button className="button accept" onClick={handleAcceptClick}>Accept</button>
                        <button className="button reject" onClick={handleRejectClick}>Reject</button>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default SupplierUI;
