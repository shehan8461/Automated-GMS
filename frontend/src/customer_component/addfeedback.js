import { useState } from 'react';
import axios from "axios";
import './addfeddback.css';

function AddFeedbackk({ updateFeedbackList }) {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        L_type: "",
        F_type: "",
        F_description: "",
        
        nameError: "",
        emailError: "",
        L_typeError: "",
        F_descriptionError: "",
    });
    
    const handleOnChange = (e) => {
        const { value, name } = e.target;
        let nameError = formdata.nameError; // Preserve previous error if any
        let emailError = formdata.emailError; // Preserve previous error if any
        let L_typeError = formdata.L_typeError; // Preserve previous error if any
        let F_descriptionError = formdata.F_descriptionError; // Preserve previous error if any

        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                emailError = "Please enter a valid email address";
            } else {
                emailError = ""; // Clear error if email is provided correctly
            }
        }

        if (name === "name") {
            if (value.trim() === "") {
                nameError = "This field is required";
            } else {
                nameError = ""; // Clear error if name is provided
            }
        }

        if (name === "L_type") {
            if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
                L_typeError = "Please enter a valid purchase item name";
            } else if (/\d/.test(value)) {
                L_typeError = "Please enter a valid purchase item name without numeric values";
            } else {
                L_typeError = ""; // Clear error if valid alphanumeric characters are provided
            }
        }

        if (name === "F_description") {
            if (value.trim() === "") {
                F_descriptionError = "This field is required";
            } else {
                F_descriptionError = ""; // Clear error if description is provided
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
        
        if (formdata.nameError || formdata.emailError || formdata.L_typeError || formdata.F_descriptionError) {
            alert("Please correct all form fields.");
            return;
        }

        try {
            const currentDate = new Date().toISOString();
            const formDataWithDate = { ...formdata, purchase_date: currentDate };

            const response = await axios.post("http://localhost:8080/create_feedback", formDataWithDate);
            
            if (response.data.success) {
                alert("Feedback submitted! Thank you for your feedback. Please check your email.");

                const emailResponse = await axios.post("http://localhost:8080/send-email_feedback", { email: formdata.email });

                if (emailResponse.data.success) {
                    updateFeedbackList(response.data.data);
                    console.log("Thank you email sent to:", formdata.email);
                }
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("An error occurred while submitting feedback. Please try again later.");
        }
    };

    return (
        <div>
              <body className='background-marketing'>
            <div className="addfeedback">
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" id="name" name="name" placeholder='customer name' onChange={handleOnChange} />
                    {formdata.nameError && <span className="error-message">{formdata.nameError}</span>}
                    <br />
                    <label>Email:</label>
                    <input type="text" id="email" name="email" placeholder='customer email' onChange={handleOnChange} />
                    {formdata.emailError && <span className="error-message">{formdata.emailError}</span>}
                    <br />
                    
                    <label>Last purchase Item:</label>
                    <input type="text" id="L_type" name="L_type" placeholder='enter item' onChange={handleOnChange} />
                    {formdata.L_typeError && <span className="error-message">{formdata.L_typeError}</span>}
                    <br />

                    <label>Feedback Type:</label>
                    <select id="F_type" name="F_type" onChange={handleOnChange}>
                        <option>Complain</option>
                        <option>Suggestion</option>
                    </select><br /><br />
                
                    <label>Description:</label>
                    <textarea rows="4" cols="50" id="F_description" name="F_description" placeholder='description' onChange={handleOnChange} />
                    {formdata.F_descriptionError && <span className="error-message">{formdata.F_descriptionError}</span>}
                    <br /><br></br>

                    <button type="submit">Submit</button>
                </form>
            </div>
            </body>
        </div>
    );
}

export default AddFeedbackk;
