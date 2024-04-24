import { useState } from "react";
import axios from "axios";
import './adddiscount.css';

function AddDiscount() {
    const [discount, setDiscount] = useState({
        item: "",
        prize: "",
        dis: ""
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        let numericValue = value;

        // Validate if the entered value is numeric
        if (name === "prize" || name === "dis") {
            // Remove non-numeric characters
            numericValue = value.replace(/[^0-9.]/g, '');
        }

        // Update the state with the validated value
        setDiscount((prev) => ({
            ...prev,
            [name]: numericValue
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if prize and dis are numeric
        if (isNaN(parseFloat(discount.prize)) || isNaN(parseFloat(discount.dis))) {
            alert("Please enter numeric values for Price and Discount");
            return;
        }

        try {
            const data = await axios.post("http://localhost:8080/create_discount", discount);
            console.log(data);
            alert("Discount added successfully!");
        } catch (error) {
            console.error("Error adding discount:", error);
            alert("An error occurred while adding the discount. Please try again later.");
        }
    };

    return (
        <div className="add-discount">
                <body className='background-marketing'>
            <form onSubmit={handleSubmit}>
                <label>Item:</label>
                <input type="text" id="item" name="item" onChange={handleOnChange} /><br />
                <label>Price:</label>
                <input type="text" id="prize" name="prize" onChange={handleOnChange} /><br />
                <label>Discount:</label>
                <input type="text" id="dis" name="dis" onChange={handleOnChange} /><br />
                <button>Add Discount</button>
            </form><br />
            <button id="dis-btn"><a href="discountdetails">Show Discount Items</a></button>
            </body>
        </div>
    );
}

export default AddDiscount;
