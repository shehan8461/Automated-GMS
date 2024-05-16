/*import { useState } from "react";
import axios from "axios";
import './add service.css'


function AddService(){
    const [order,setorder]=useState({
     p_id:"",
    name:"",
    price:"",
    quantity:"",
    total:""
        
       
    })

    const handleonchange=(e)=>{
        const {value,name}=e.target
        setorder((preve)=>{
               return{
                ...preve,
                [name]:value
               }
          })
       
        
    }
    
    const handlesubmit=async(e)=>{
     
       e.preventDefault()
       const data=await axios.post("http://localhost:8080/create_sales",order)
          console.log(data)
          alert("your details added now!")
         
     
    }


    return(
        <div className="add-service">
    
<h2>Add Payment Details</h2>
    <form onSubmit={handlesubmit}>
    <lable>Product id:</lable>
    <input type="text" id="p_id" name="p_id" onChange={handleonchange}/><br></br>
    <lable>Product Name:</lable>
    <input type="text" id="name" name="name" onChange={handleonchange}/><br></br>
    <lable>Unit Price:</lable>
    <input type="text" id="price" name="price" onChange={handleonchange}/><br></br> 
    <lable>Quantity Sold:</lable>
    <input type="text" id="quantity" name="quantity" onChange={handleonchange}/><br></br>
    <lable>Total Price:</lable>
    <input type="text" id="total" name="total" onChange={handleonchange}/><br></br>
     <br></br> <br></br> <br></br> 
  


    <button>Order Place</button>
    </form><br></br> 
   
        </div>
    )
}
export default AddService;

*/

/*my code2 
import React, { useState } from "react";
import axios from "axios";
import './add service.css';

function AddService() {
    const [order, setOrder] = useState({
        p_id: "",
        name: "",
        price: "",
        quantity: "",
        total: ""
    });

    const [errors, setErrors] = useState({
        p_id: "",
        name: "",
        price: "",
        quantity: "",
        total: ""
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        const regexInt = /^\d*$/; // Regex to match only numbers
        const regexStr = /^[a-zA-Z\s]*$/; // Regex to match only letters

        // Clear previous error message
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

        // Input validation
        if ((name === "p_id" || name === "price" || name === "quantity" || name === "total") && !regexInt.test(value)) {
            setErrors(prev => ({
                ...prev,
                [name]: "Please enter numbers."
            }));
        } else if (name === "name" && !regexStr.test(value)) {
            setErrors(prev => ({
                ...prev,
                [name]: "Please enter letters."
            }));
        }

        // Update order state
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { value, name } = e.target;

        // Display message if the field is skipped without entering any value
        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: "Please enter this field."
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is empty
        for (const key in order) {
            if (!order[key].trim()) {
                setErrors(prev => ({
                    ...prev,
                    [key]: "Please enter this field."
                }));
                return;
            }
        }

        // Submit data if all fields are filled
        const data = await axios.post("http://localhost:8080/create", order);
        console.log(data);
        alert("Your details have been added!");
    };

    return (
        <div className="add-service">
            <h2>Add Payment Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Product id:</label>
                <input type="text" id="p_id" name="p_id" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.p_id && <p className="error">{errors.p_id}</p>}<br/><br/>

                <label>Product Name:</label>
                <input type="text" id="name" name="name" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.name && <p className="error">{errors.name}</p>}<br/><br/>

                <label>Unit Price:</label>
                <input type="text" id="price" name="price" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.price && <p className="error">{errors.price}</p>}<br/><br/>

                <label>Quantity Sold:</label>
                <input type="text" id="quantity" name="quantity" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.quantity && <p className="error">{errors.quantity}</p>}<br/><br/>

                <label>Total Price:</label>
                <input type="text" id="total" name="total" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.total && <p className="error">{errors.total}</p>}<br/><br/>

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
}

export default AddService;

*/

/*
import React, { useState } from "react";
import axios from "axios";
import './add service.css';

function AddService() {
    const [order, setOrder] = useState({
        p_id: "",
        name: "",
        price: "",
        quantity: "",
        total: ""
    });

    const [errors, setErrors] = useState({
        p_id: "",
        name: "",
        price: "",
        quantity: "",
        total: ""
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        const regexInt = /^\d*$/; // Regex to match only numbers
        const regexStr = /^[a-zA-Z\s]*$/; // Regex to match only letters

        // Clear previous error message
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

        // Input validation
        if ((name === "p_id" || name === "price" || name === "quantity" || name === "total") && !regexInt.test(value)) {
            setErrors(prev => ({
                ...prev,
                [name]: "Invalid input. Please enter numbers."
            }));
            return; // Prevent adding data with invalid input
        } else if (name === "name" && !regexStr.test(value)) {
            setErrors(prev => ({
                ...prev,
                [name]: "Invalid input. Please enter letters."
            }));
            return; // Prevent adding data with invalid input
        }

        // Update order state
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { value, name } = e.target;

        // Display message if the field is skipped without entering any value
        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: "Please enter this field."
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is empty or has invalid input
        for (const key in order) {
            if (!order[key].trim() || errors[key]) {
                setErrors(prev => ({
                    ...prev,
                    [key]: !order[key].trim() ? "Please enter this field." : errors[key]
                }));
                return; // Prevent submission if any field is empty or has invalid input
            }
        }

        // Submit data if all fields are filled and have valid input
        const data = await axios.post("http://localhost:8080/create", order);
        console.log(data);
        alert("Your details have been added!");
    };

    return (
        <div className="add-service">
            <h2>Add Sales Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Product id:</label>
                <input type="text" id="p_id" name="p_id" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.p_id && <p className="error">{errors.p_id}</p>}<br/><br/>

                <label>Product Name:</label>
                <input type="text" id="name" name="name" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.name && <p className="error">{errors.name}</p>}<br/><br/>

                <label>Unit Price (Rs.) :</label>
                <input type="text" id="price" name="price" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.price && <p className="error">{errors.price}</p>}<br/><br/>

                <label>Quantity Sold:</label>
                <input type="text" id="quantity" name="quantity" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.quantity && <p className="error">{errors.quantity}</p>}<br/><br/>

                <label>Total Price (Rs.) :</label>
                <input type="text" id="total" name="total" onChange={handleOnChange} onBlur={handleBlur} />
                {errors.total && <p className="error">{errors.total}</p>}<br/><br/>

                <button type="submit">SUBMIT</button>
            </form>
        </div>
    );
}

export default AddService;
*/

import React, { useState } from "react";
import axios from "axios";
import './add service.css';

function AddService() {
    const [order, setOrder] = useState({
        p_id: "",
        name: "",
        price: "",
        quantity: "",
        total: ""
    });

    const [errors, setErrors] = useState({
        p_id: "",
        name: "",
        price: "",
        quantity: "",
        total: ""
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        const regexInt = /^\d*$/; // Regex to match only numbers
        const regexStr = /^[a-zA-Z\s]*$/; // Regex to match only letters

        // Clear previous error message
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

        // Input validation
        if ((name === "p_id" || name === "price" || name === "quantity" || name === "total") && !regexInt.test(value)) {
            setErrors(prev => ({
                ...prev,
                [name]: "Invalid input. Please enter numbers."
            }));
            return; // Prevent adding data with invalid input
        } else if (name === "name" && !regexStr.test(value)) {
            setErrors(prev => ({
                ...prev,
                [name]: "Invalid input. Please enter letters."
            }));
            return; // Prevent adding data with invalid input
        }

        // Update order state
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { value, name } = e.target;

        // Display message if the field is skipped without entering any value
        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: "Please enter this field."
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is empty or has invalid input
        for (const key in order) {
            if (!order[key].trim() || errors[key]) {
                setErrors(prev => ({
                    ...prev,
                    [key]: !order[key].trim() ? "Please enter this field." : errors[key]
                }));
                return; // Prevent submission if any field is empty or has invalid input
            }
        }

        // Submit data if all fields are filled and have valid input
        const data = await axios.post("http://localhost:8080/create_sales", order);
        console.log(data);
        alert("Your details have been added!");
    };

    return (
        <div className="service-page">
            <div className="add-service">
                <h2>Add Sales Details</h2>
                <form onSubmit={handleSubmit}>
                    <label>Product id:</label>
                    <input type="text" id="p_id" name="p_id" onChange={handleOnChange} onBlur={handleBlur} />
                    {errors.p_id && <p className="error">{errors.p_id}</p>}<br/><br/>

                    <label>Product Name:</label>
                    <input type="text" id="name" name="name" onChange={handleOnChange} onBlur={handleBlur} />
                    {errors.name && <p className="error">{errors.name}</p>}<br/><br/>

                    <label>Unit Price (Rs.) :</label>
                    <input type="text" id="price" name="price" onChange={handleOnChange} onBlur={handleBlur} />
                    {errors.price && <p className="error">{errors.price}</p>}<br/><br/>

                    <label>Quantity Sold:</label>
                    <input type="text" id="quantity" name="quantity" onChange={handleOnChange} onBlur={handleBlur} />
                    {errors.quantity && <p className="error">{errors.quantity}</p>}<br/><br/>

                    <label>Total Price (Rs.) :</label>
                    <input type="text" id="total" name="total" onChange={handleOnChange} onBlur={handleBlur} />
                    {errors.total && <p className="error">{errors.total}</p>}<br/><br/>

                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    );
}

export default AddService;
