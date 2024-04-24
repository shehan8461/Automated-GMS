import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './placeOrder.css';

function PlaceOrder() {
    const [orderdata, setorderdata] = useState({
        name: "",
        product: "",
        quantity: "",
        date: "",
    });
    const [supplierData, setsupplierData] = useState({
        name: "",
        phone: "",
        product: "",
        type: "",
        unitPrice: "",
        contractStart: "",
        contractEnd: "",
    });
    const [errors, setErrors] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`);
                const data = response.data;

                if (data.success) {
                    setsupplierData(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchSupplierData();
    }, [id]);

    const handleInputChange = (e) => {
        setsupplierData({
            ...supplierData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setorderdata((prev) => ({
            ...prev,
            [name]: value
        }));

        // Validate the field being edited
        const fieldErrors = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: fieldErrors[name]
        }));
    };

    const validateField = (fieldName, value) => {
        const fieldErrors = {};

        // Validation rules for the specific field
        switch (fieldName) {
            case 'product':
                if (!value.trim()) {
                    fieldErrors.product = "Product is required";
                }
                break;
            case 'quantity':
                if (!value.trim()) {
                    fieldErrors.quantity = "Quantity is required";
                } else if (!/^\d+$/.test(value)) {
                    fieldErrors.quantity = "Invalid quantity";
                }
                break;
            case 'date':
                if (!value) {
                    fieldErrors.date = "Date is required";
                }
                break;
            default:
                break;
        }

        return fieldErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = {};
        Object.keys(orderdata).forEach((key) => {
            const fieldErrors = validateField(key, orderdata[key]);
            if (Object.keys(fieldErrors).length > 0) {
                formErrors[key] = fieldErrors[key];
            }
        });
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8080/create_order_supplier", orderdata);
                console.log(response.data);
                alert("Order placed successfully!");
            } catch (error) {
                console.error("Error placing order:", error);
                alert("An error occurred while placing the order");
            }
        }
    };

    return (
        <div className="order-form">
            <form onSubmit={handleSubmit}>
                <h2>Place New Order</h2>
                <label className="form-label1">Supplier / Company Name : </label>
                <input
                    type="text"
                    className="update-form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Supplier Name"
                    onChange={handleOnChange}
                    
                    
                />
                <br />
                {errors.product && <span className="text-danger">{errors.product}</span>}
                <br />
                <label htmlFor="product" className="form-label1">Product : </label>
                <input
                    type="text"
                    id="product"
                    name="product"
                    placeholder="Enter Product"
                    onChange={handleOnChange}
                />
                {errors.product && <span className="text-danger">{errors.product}</span>}
                <br /><br />
                <label htmlFor="quantity" className="form-label1">Quantity Needed : </label>
                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    placeholder="Enter Quantity Needed"
                    onChange={handleOnChange}
                />
                {errors.quantity && <span className="text-danger">{errors.quantity}</span>}
                <br /><br />
                <label htmlFor="date" className="form-label1">Date : </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="Enter the date"
                    onChange={handleOnChange}
                />
                {errors.date && <span className="text-danger">{errors.date}</span>}
                <br /><br /><br />
                <button className='orderbtn'>Send Order</button>
            </form>
        </div>
    );
}

export default PlaceOrder;
