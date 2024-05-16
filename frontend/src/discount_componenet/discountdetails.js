import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './discountdetails.css';
import { useReactToPrint } from 'react-to-print';
import logo from './selyn-high-resolution-logo-transparent(2).png';

function DiscountDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setShowDiscounts] = useState([]);

    // Fetch data
    const fetchDiscountData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/discount_read');
            if (response.data.success) {
                setShowDiscounts(response.data.data);
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchDiscountData();
    }, []);

    // Delete discount item
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/delete_discount/${id}`);
            if (response.data.success) {
                fetchDiscountData();
                alert('Discount item deleted successfully!');
            }
        } catch (error) {
            alert(error);
        }
    };

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Discounts Report',
        onBeforeGetContent: () => {
            const dateElement = document.createElement('h6');
            dateElement.textContent = `Date: ${new Date().toLocaleDateString()}`;
            dateElement.id = 'pdfDate';
            componentPDF.current.appendChild(dateElement);
        },
        onAfterPrint: () => {
            const dateElement = document.getElementById('pdfDate');
            if (dateElement) {
                componentPDF.current.removeChild(dateElement);
            }
            alert('Data saved in PDF');
        },
    });

    return (
        <div className="showdiscount">
            <div className="background-marketing">
                <div ref={componentPDF} style={{ width: '100%' }}>
                    <img src={logo} alt="logo" height="90px" width="96px" />
                    <table id="discount-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Price</th>
                                <th>Discounted Price</th>
                                <th className="choose-option-header">Choose Option</th>
                            </tr>
                        </thead>
                        
                        <tbody >
                            {showdiscounts.map((discount) => (
                                <tr key={discount._id}>
                                    <td>{discount.item}</td>
                                    <td>{discount.prize}</td>
                                    <td>{(discount.prize - (discount.dis / 100) * discount.prize).toFixed(2)}</td>
                                    <td className="choose-option-cell">
                                        <a href={`/update_discount/${discount._id}`}>Edit Discount</a>
                                        <button onClick={() => handleDelete(discount._id)}>Delete Item</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
               
                    </table>
                    <div id="datereport">
                    <p>_ _ _ _ _ _ _</p>
                   </div>
                </div>
                <button id="btnreport" onClick={generatePDF}>Download Report</button>
             
            </div>
        </div>
    );
}

export default DiscountDetails;
