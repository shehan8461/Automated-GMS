import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './updatediscount.css';

function UpdateDiscount() {
    const { id } = useParams();
    const [updatediscount, setupdatediscount] = useState({
        item: "",
        prize: "",
        dis: "",
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
        setupdatediscount((prev) => ({
            ...prev,
            [name]: numericValue
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage
        }));
    };

    const handlePrizeBlur = () => {
        // Add RS. prefix to the prize value if it exists and is a string
        setupdatediscount((prev) => ({
            ...prev,
            prize: prev.prize ? `RS. ${prev.prize}` : ""
        }));
    };

    const handlePrizeFocus = () => {
        // Ensure prev.prize is a string before calling replace
        setupdatediscount((prev) => ({
            ...prev,
            prize: prev.prize ? prev.prize.replace(/^RS. /, '') : ""
        }));
    };

    const handleDisBlur = () => {
        // Add % suffix to the discount value if it exists and is a string
        setupdatediscount((prev) => ({
            ...prev,
            dis: prev.dis ? `${prev.dis}%` : ""
        }));
    };

    const handleDisFocus = () => {
        // Ensure prev.dis is a string before calling replace
        setupdatediscount((prev) => ({
            ...prev,
            dis: prev.dis ? prev.dis.replace(/%$/, '') : ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Remove "RS." prefix from prize and "%" suffix from dis
        const prizeValue = updatediscount.prize.replace(/^RS. /, '');
        const disValue = updatediscount.dis.replace(/%$/, '');

        // Check if prize and dis are numeric
        if (!prizeValue || isNaN(parseFloat(prizeValue)) || !disValue || isNaN(parseFloat(disValue))) {
            alert("Please enter valid numeric values for Price and Discount");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/update_discount`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id, // Pass the correct id
                    item: updatediscount.item,
                    prize: prizeValue, // Send the cleaned prize value
                    dis: disValue, // Send the cleaned discount value
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Discount updated successfully');
                alert("Updated successfully");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating discount:', error);
        }
    };

    useEffect(() => {
        const fetchDiscountData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/discount/${id}`);
                const data = await response.json();

                if (data.success) {
                    setupdatediscount({
                        ...data.data,
                        prize: `RS. ${data.data.prize}`,
                        dis: `${data.data.dis}%`,
                    });
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching discount data:', error);
            }
        };

        fetchDiscountData();
    }, [id]);

    return (
        <div className='discount-update'>
            <body className='background-marketing'>
                <form onSubmit={handleSubmit}>
                    <label>Item:</label>
                    <input type="text" id="item" name="item" onChange={handleOnChange} value={updatediscount?.item} /><br />
                    <label>Price:</label>
                    <input type="text" id="prize" name="prize" onChange={handleOnChange} onFocus={handlePrizeFocus} onBlur={handlePrizeBlur} value={updatediscount?.prize} /><br />
                    {errors.prize && <span className="error">{errors.prize}</span>}
                    <label>Discount:</label>
                    <input type="text" id="dis" name="dis" onChange={handleOnChange} onFocus={handleDisFocus} onBlur={handleDisBlur} value={updatediscount?.dis} /><br />
                    {errors.dis && <span className="error">{errors.dis}</span>}
                    <button type="submit">Update</button><br /><br />
                    <button><a href='/discountdetails'>Discount List</a></button>
                </form>
            </body>
        </div>
    );
}

export default UpdateDiscount;
