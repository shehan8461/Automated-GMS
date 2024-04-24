import React, { useState } from 'react';
import axios from 'axios';
import './css/addSupplier.css';

function AddSupplier() {
    const [formdata, setformdata] = useState({
        name: "",
        phone: "",
        product: "",
        type: "",
        unitPrice: "",
        contractStart: "",
        contractEnd: "",
    });
    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setformdata((prev) => ({
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
            case 'name':
                if (!value.trim()) {
                    fieldErrors.name = "Supplier name is required";
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    fieldErrors.phone = "Supplier contact number is required";
                } else if (!/^\d{3}-\d{7}$/.test(value)) {
                    fieldErrors.phone = "Invalid phone number format (e.g., XXX-XXXXXXX)";
                }
                break;
            case 'product':
                if (!value.trim()) {
                    fieldErrors.product = "Product category is required";
                }
                break;
            case 'type':
                if (!value.trim()) {
                    fieldErrors.type = "Type of product supplied is required";
                }
                break;
            case 'unitPrice':
                if (!value.trim()) {
                    fieldErrors.unitPrice = "Price per unit is required";
                } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                    fieldErrors.unitPrice = "Invalid price format";
                }
                break;
            case 'contractStart':
                if (!value) {
                    fieldErrors.contractStart = "Contract start date is required";
                }
                break;
            case 'contractEnd':
                if (!value) {
                    fieldErrors.contractEnd = "Contract end date is required";
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
        
        // Validate all fields before submitting the form
        Object.keys(formdata).forEach((key) => {
            const fieldErrors = validateField(key, formdata[key]);
            if (Object.keys(fieldErrors).length > 0) {
                formErrors[key] = fieldErrors[key];
            }
        });
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8080/create_supplier", formdata);
                console.log(response.data);
                alert("Data added successfully!");
            } catch (error) {
                console.error("Error adding data:", error);
                alert("An error occurred while adding data");
            }
        }
    };

    return (
        <div>
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>ADD NEW SUPPLIER</h2>
                    </div>
                    <br />
                    
                    
                    <div className="mb-3">
                    <br></br><label htmlFor="name" className="form-label">
                            Supplier Name / Company Name
                        </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter Supplier Name"
                            onChange={handleOnChange}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    
                    <div className="mb-3">
                    <br></br><label htmlFor="phone" className="form-label">
                            Supplier contact number
                        </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="XXX-XXXXXXX"
                            onChange={handleOnChange}
                        />
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    </div>
                    
                    <div className="mb-3">
                    <br></br><label htmlFor="product" className="form-label">
                            Product category
                        </label>
                        <br />
                        <select
                            className="form-select"
                            id="product"
                            name="product"
                            onChange={handleOnChange}
                        >
                            <option value="">Select the category</option>
                            <option value="">Select the category</option>
                            <option value="cotton">Cotton</option>
                            <option value="nylon">Nylon</option>
                            <option value="polyester">Polyester</option>
                            <option value="linen">Linen</option>
                            <option value="silk">Silk</option>
                            <option value="beads">Beads</option>
                            <option value="zipper">Zippers</option>
                            <option value="ribbon">Ribbons</option>
                            <option value="dye">Fabric dyes</option>
                            <option value="box">Shipping Boxes</option>
                            <option value="sewingThread">Sewing Threads</option>
                            <option value="elastic">Elastics</option>
                            <option value="glue">Glues</option>
                            <option value="lableTag">Labels and Tags</option>
                            
                        </select>
                        {errors.product && <span className="text-danger">{errors.product}</span>}
                    </div>
                    
                    <div className="mb-3">
                        <br></br><label htmlFor="type" className="form-label">
                            Type of the product that is supplied
                        </label>
                        <br />
                        <select
                            className="form-select"
                            id="type"
                            name="type"
                            onChange={handleOnChange}
                        >
                            <option value="">Select the category</option>
                            <option value="local">Local</option>
                            <option value="imported">Imported</option>
                            
                        </select>
                        {errors.type && <span className="text-danger">{errors.type}</span>}
                    </div>
                    
                    <div className="mb-3">
                    <br></br><label htmlFor="unitPrice" className="form-label">
                            Price per unit (Rs.)
                        </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            id="unitPrice"
                            name="unitPrice"
                            placeholder="Enter the price per unit in Rupees"
                            onChange={handleOnChange}
                        />
                        {errors.unitPrice && <span className="text-danger">{errors.unitPrice}</span>}
                    </div>
                    
                    <div className="mb-3">
                    <br></br><label htmlFor="contractStart" className="form-label">
                            Start date of the contract
                        </label>
                        <br />
                        <input
                            type="date"
                            className="form-control"
                            id="contractStart"
                            name="contractStart"
                            placeholder="dd/mm/yyyy"
                            onChange={handleOnChange}
                        />
                        {errors.contractStart && <span className="text-danger">{errors.contractStart}</span>}
                    </div>
                    
                    <div className="mb-3">
                    <br></br><label htmlFor="contractEnd" className="form-label">
                            End date of the contract
                        </label>
                        <br />
                        <input
                            type="date"
                            className="form-control"
                            id="contractEnd"
                            name="contractEnd"
                            placeholder="dd/mm/yyyy"
                            onChange={handleOnChange}
                        />
                        {errors.contractEnd && <span className="text-danger">{errors.contractEnd}</span>}
                    </div>
                    <br />
                    <center>
                        <button type="submit" className="btn btn-primary">
                            Add Supplier
                        </button>
                    </center>
                </form>
            </div>
        </div>
    );
}

export default AddSupplier;
