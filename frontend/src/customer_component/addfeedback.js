import { useState } from 'react';
import axios from "axios";
import './adduser.css';
import logo from './selyn-high-resolution-logo-transparent(2).png';

function AddFeedback() {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        L_date: "",
        L_type: "",
        F_type: "",
        F_description: "",
        errorMessage: "" // Added for validation error message
    });

    const handleonchange = (e) => {
        const { value, name } = e.target;
        let errorMessage = "";

        // Email validation
        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorMessage = "Please enter a valid email address";
             
            }
        }

        setformdata((prev) => ({
            ...prev,
            [name]: value,
            errorMessage: errorMessage // Update error message for the field
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        // Check if there are any validation errors
        if (formdata.errorMessage) {
            alert("Please correct the form errors.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/create_feedback", formdata);
            console.log(response);
            alert("Feedback submitted");

            // Send thank you email
            await axios.post("http://localhost:8080/send-email_feedback", { email: formdata.email });
            console.log("Thank you email sent to:", formdata.email);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("An error occurred while submitting feedback. Please try again later.");
        }
    };

    return (
        <body className='feedback-background'>
            <p className='navbarfeedback'>
                <h3>Seylin Clothes (PVT)</h3>
                <img src={logo} alt="Logo" />
            </p>
            <div className="adduser">
                <form onSubmit={handlesubmit}>
                    <label>Name:</label>
                    <input type="text" id="name" name="name" onChange={handleonchange} /><br />
                    <label>Email:</label>
                    <input type="text" id="email" name="email" onChange={handleonchange} />
                  
                    {formdata.errorMessage && ( <span className="error">{formdata.errorMessage}</span> )}
                    <br />
                    <label>Last purchase date:</label>
                    <input type="date" id="L_date" name="L_date" onChange={handleonchange} /><br />
                    <label>Last purchase Item:</label>
                    <input type="text" id="L_type" name="L_type" onChange={handleonchange} /><br />
                    <label>Feedback Type (complain or suggestion):</label>
                    <input type="text" id="F_type" name="F_type" onChange={handleonchange} /><br />
                    <label>Description:</label>
                    <textarea rows="4" cols="50" id="F_discription" name="F_discription" onChange={handleonchange} /><br />

                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </body>
    );
}

export default AddFeedback;
