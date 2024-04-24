import { useState } from 'react';
import axios from "axios";
import './addfeddback.css';

function AddFeedback() {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        L_date: "",
        L_type: "",
        F_type: "",
        F_description: "",
        nameError: "", // Error message for the name field
        emailError: "", // Error message for the email field
        L_typeError: "", // Error message for the last purchase item field
        F_descriptionError: "", // Error message for the description field
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        let nameError = ""; // Initialize name error message
        let emailError = ""; // Initialize email error message
        let L_typeError = ""; // Initialize last purchase item error message
        let F_descriptionError = ""; // Initialize description error message

        // Email validation
        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                emailError = "Please enter a valid email address";
            }
        }

        // Validate name field
        if (name === "name") {
            if (value.trim() === "") {
                nameError = "This field is required";
            }
        }

        // Validate last purchase item field
        if (name === "L_type") {
            if (value.trim() === "") {
                L_typeError = "This field is required";
            }
        }

        // Validate description field
        if (name === "F_description") {
            if (value.trim() === "") {
                F_descriptionError = "This field is required";
            }
        }

        setformdata((prev) => ({
            ...prev,
            [name]: value,
            nameError: nameError,
            emailError: emailError,
            L_typeError: L_typeError,
            F_descriptionError: F_descriptionError,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if there are any validation errors
        if (formdata.nameError || formdata.emailError || formdata.L_typeError || formdata.F_descriptionError) {
            alert("Please correct all form fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/create_feedback", formdata);
            console.log(response);
            alert("Feedback submitted! Thank you for your feedback. Please check your email.");

            // Send thank you email
            await axios.post("http://localhost:8080/send-email_feedback", { email: formdata.email });
            console.log("Thank you email sent to:", formdata.email);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("An error occurred while submitting feedback. Please try again later.");
        }
    };

    return (
        <div>
            <body className='background-marketing'>
                <div className="adduser">
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" id="name" name="name" onChange={handleOnChange} />
                        {formdata.nameError && <span className="error-message">{formdata.nameError}</span>}
                        <br />
                        <label>Email:</label>
                        <input type="text" id="email" name="email" onChange={handleOnChange} />
                        {formdata.emailError && <span className="error-message">{formdata.emailError}</span>}
                        <br />
                        <label>Last purchase date:</label>
                        <input type="date" id="L_date" name="L_date" onChange={handleOnChange} /><br />
                        <label>Last purchase Item:</label>
                        <input type="text" id="L_type" name="L_type" onChange={handleOnChange} />
                        {formdata.L_typeError && <span className="error-message">{formdata.L_typeError}</span>}
                        <br />

                        <label>Feedback Type:</label>
                        <select id="F_type" name="F_type" onChange={handleOnChange}>
                            <option>Complain</option>
                            <option>Suggestion</option>
                        </select><br /><br />
                    
                        <label>Description:</label>
                        <textarea rows="4" cols="50" id="F_description" name="F_description" onChange={handleOnChange} />
                        {formdata.F_descriptionError && <span className="error-message">{formdata.F_descriptionError}</span>}
                        <br />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </body>
        </div>
    );
}

export default AddFeedback;
