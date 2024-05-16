import { useState } from "react";
import axios from "axios";
import './adddiscount.css';

function AddDiscount() {
    const [discount, setDiscount] = useState({
        item: "",
        prize: "",
        dis: ""
    });

    const [errors, setErrors] = useState({
        prize: "",
        dis: ""
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        let numericValue = value;
        let errorMessage = "";

        // Validate if the entered value is numeric
        if (name === "prize" || name === "dis") {
            // Remove non-numeric characters except for the decimal point
            numericValue = value.replace(/[^0-9.]/g, '');
            if (value !== numericValue) {
                errorMessage = "Please enter valid numeric values";
            }
        }

        // Update the state with the validated value and error message
        setDiscount((prev) => ({
            ...prev,
            [name]: numericValue
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage
        }));
    };

    const handlePrizeBlur = () => {
        // Add RS. prefix to the prize value
        setDiscount((prev) => ({
            ...prev,
            prize: prev.prize ? `RS. ${prev.prize}` : ""
        }));
    };

    const handlePrizeFocus = () => {
        // Remove RS. prefix when the prize input is focused
        setDiscount((prev) => ({
            ...prev,
            prize: prev.prize.replace(/^RS. /, '')
        }));
    };

    const handleDisBlur = () => {
        // Add % suffix to the discount value
        setDiscount((prev) => ({
            ...prev,
            dis: prev.dis ? `${prev.dis}%` : ""
        }));
    };

    const handleDisFocus = () => {
        // Remove % suffix when the discount input is focused
        setDiscount((prev) => ({
            ...prev,
            dis: prev.dis.replace(/%$/, '')
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prizeValue = discount.prize.replace(/^RS. /, '');
        const disValue = discount.dis.replace(/%$/, '');

        // Check if prize and dis are numeric
        if (!prizeValue || isNaN(parseFloat(prizeValue)) || !disValue || isNaN(parseFloat(disValue))) {
            alert("Please enter valid numeric values for Price and Discount");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/create_discount", {
                ...discount,
                prize: prizeValue,
                dis: disValue
            });
            console.log(response.data);
            alert("Discount added successfully!");
        } catch (error) {
            console.error("Error adding discount:", error);
            alert("An error occurred while adding the discount. Please try again later.");
        }
    };

    return (
        <div className="add-discount">
            <div className='background-marketing'>
                <form onSubmit={handleSubmit}>
                    <label>Item:</label>
                    <input type="text" id="item" name="item" value={discount.item} onChange={handleOnChange}  placeholder="Item Name"/><br />
                    <label>Price:</label>
                    <input
                        type="text"
                        id="prize"
                        name="prize"
                        placeholder="Price"
                        value={discount.prize}
                        onChange={handleOnChange}
                        onBlur={handlePrizeBlur}
                        onFocus={handlePrizeFocus}
                    /><br />
                    {errors.prize && <span className="error">{errors.prize}</span>}
                    <label>Discount:</label>
                    <input
                        type="text"
                        id="dis"
                        name="dis"
                        placeholder="Discount"
                        value={discount.dis}
                        onChange={handleOnChange}
                        onBlur={handleDisBlur}
                        onFocus={handleDisFocus}
                    /><br />
                    {errors.dis && <span className="error">{errors.dis}</span>}
                    <button type="submit">Add Discount</button>
                </form><br />
                <button id="dis-btn"><a href="discountdetails">Show Discount Items</a></button>
            </div>
        </div>
    );
}

export default AddDiscount;
