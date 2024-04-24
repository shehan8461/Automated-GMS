import { useState } from 'react';
import axios from "axios";
import './adduser.css';


function AddFeedback() {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        L_date: "",
        L_type: "",
        F_type: "",
        F_description: "",
        errorMessage: "",
      // Corrected name for validation error message
    });

    const handleOnChange = (e) => {
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
            errorMessage: errorMessage,
         
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if there are any validation errors
        if (formdata.errorMessage || formdata.requiredMessage) {
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
                       
                        <br />
                        <label>Email:</label>
                        <input type="text" id="email" name="email" onChange={handleOnChange} />
                        {formdata.errorMessage && ( <span className="error-message">{formdata.errorMessage}</span> )}
                        <br />
                        <label>Last purchase date:</label>
                        <input type="date" id="L_date" name="L_date" onChange={handleOnChange} /><br />
                        <label>Last purchase Item:</label>
                        <input type="text" id="L_type" name="L_type" onChange={handleOnChange} /><br />

                        <label>Feedback Type:</label>
                        <select id="F_type" name="F_type" onChange={handleOnChange}>
                            <option>Complain</option>
                            <option>Suggestion</option>
                        </select><br /><br />
                    
                        <label>Description:</label>
                        <textarea rows="4" cols="50" id="F_description" name="F_description" onChange={handleOnChange} /><br />

                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </body>
        </div>
    );
}

export default AddFeedback;
