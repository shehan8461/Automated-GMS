import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feedbackdetails.css';

function FeedbackDetails() {
    const [datalist, setdatalist] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:8080/feedback_read");
            if (data.data.success) {
                const feedbackData = data.data.data.map(feedback => ({
                    ...feedback,
                    purchase_date: formatDate(feedback.purchase_date), // Format the purchase date
                    created_time: formatDate(feedback.createdAt) // Format the created time
                }));
                setdatalist(feedbackData);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    const handledelete = async (id) => {
        try {
            const data = await axios.delete("http://localhost:8080/delete_feedback/" + id);
            if (data.data.success) {
                getfetchdata();
                alert("Feedback removed!");
            }
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("An error occurred while deleting feedback. Please try again later.");
        }
    };

    const handlesearch = () => {
        filterdata(searchkey);
    };

    const filterdata = (searchKey) => {
        const filteredData = datalist.filter(customer =>
            customer.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setdatalist(filteredData);
    };

    const updateFeedbackList = (newFeedback) => {
        setdatalist([newFeedback, ...datalist]);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Invalid date, return empty string or any other fallback value
            return "Invalid Date";
        } else {
            // Format the date as needed (e.g., "YYYY/MM/DD")
            return date.toISOString().slice(0,10);
        }
    };

    return (
        <div>
            <body className='background-marketing'>
                <div className="userdetails">
                    <div className='searchbtn'>
                        <input type="search" onChange={(e) => setsearchkey(e.target.value)} placeholder='customer name' className='in' /><br />
                        <button id='search-btn' onClick={handlesearch}>Search</button>
                    </div>
                    <table id="feedbacktable">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                
                                <th>Last Purchase Item</th>
                                <th>Feedback Type</th>
                                <th>Description</th>
                                <th>Purchased Date</th> {/* New column */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datalist.map((feedback) => (
                                <tr key={feedback._id}>
                                    <td>{feedback.name}</td>
                                    <td>{feedback.email}</td>
                                 
                                    <td>{feedback.L_type}</td>
                                    <td>{feedback.F_type}</td>
                                    <td>{feedback.F_description}</td>
                                    <td>{feedback.created_time}</td> {/* Display created time */}
                                    <td>
                                        <button onClick={() => handledelete(feedback._id)}>Delete Feedback</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </body>
        </div>
    );
}

export default FeedbackDetails;
