import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import backgroundImage from '../Inventory_component/Images/NewBg1.jpg';
import logo from '../Inventory_component/Images/selyn-high-resolution-logo-transparent.png';
import NavBar from './S_NavBar.jsx';

export default function AllInventory() {
    const [inventory, setInventory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInventory, setFilteredInventory] = useState([]);

    useEffect(() => {
        async function fetchInventory() {
            try {
                const response = await axios.get('http://localhost:8080/stock/view_stock');
                setInventory(response.data);
                setFilteredInventory(response.data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                // Add logic to handle errors
            }
        }

        fetchInventory();
    }, []);

    // Function to handle deletion of an item
    const deleteItem = async (id) => {
        try {
            await axios.delete("http://localhost:8080/stock/delete_stock/" + id);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Filter inventory based on search query
        const filteredItems = inventory.filter(item =>
            item.ProductName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredInventory(filteredItems);
    };

    // Function to generate and download PDF
    const generatePDF = () => {
        const doc = new jsPDF();

    
        doc.addImage(logo, 'PNG', 10, 10, 20, 20); 

        
        doc.setFontSize(17)
        doc.text('Automated Garment Management System',50,20)

       
        doc.setLineWidth(0.5)
        doc.line(10,35,
            doc.internal.pageSize.getWidth()-10,35
        )
       
        doc.setFontSize(14)
        doc.text("Inventory Report", 70, 40);

       
        doc.autoTable({ html: '#inventory-table', startY: 50 }); 

        // Add current date to the PDF
        const currentDate = new Date().toLocaleDateString();
        doc.text(`Date: ${currentDate}`, 10, doc.internal.pageSize.height - 10);

        // Add signature text
        doc.text("Signature", 10, doc.internal.pageSize.height - 20);

        // Save the PDF
        doc.save('inventory.pdf');
    };

    return (
        <div>
            <NavBar />
            <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <section className="bg-blue-200 bg-opacity-80 p-3 sm:p-5 antialiased">
                    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <div className="w-full md:w-1/2">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="simple-search"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Search"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                required=""
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <button onClick={generatePDF} className="w-full md:w-auto flex items-center justify-center text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Generate PDF
                                    </button>
                                    <Link to="/AddStock">
                                        <button className="flex items-center justify-center text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                            Add Stock
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table style={{marginLeft:'0px'}} id="inventory-table" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-4">Product Name</th>
                                            <th scope="col" className="px-4 py-3">Value</th>
                                            <th scope="col" className="px-4 py-3">Quantity</th>
                                            <th scope="col" className="px-4 py-3">Minimum<br />Amount</th>
                                            <th style={{textAlign:'center'}} scope="col" className="px-4 py-3">Description</th>
                                            <th scope="col" className="px-4 py-3">Product Code</th>
                                            <th style={{textAlign:'center'}} scope="col" className="px-4 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInventory.map((item,index) =>(
                                            <tr key={index} className="border-b dark:border-gray-700">
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-gray">{item.ProductName}</td>
                                                <td className="px-4 py-3 dark:text-black">{item.value}</td>
                                                <td style={{textAlign:'center'}} className="px-4 py-3 dark:text-black">{item.quantity}</td>
                                                <td style={{textAlign:'center'}} className="px-4 py-3  dark:text-black max-w-[12rem] truncate">{item.minimumAmount}</td>
                                                <td className="px-4 py-3 dark:text-black">{item.description}</td>
                                                <td style={{textAlign:'center'}} className="px-4 py-3 dark:text-black">{item.productCode}</td>
                                                <td className="px-4 py-3 flex items-center justify-end">
                                                    <Link to={`/UpdateStock/${item._id}`} >
                                                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                            Update
                                                        </button>
                                                    </Link>
                                                    <button onClick={(e) => {
                                                        e.preventDefault(); 
                                                        if(window.confirm("Are you sure do you want to delete this item?")){
                                                            deleteItem(item._id)
                                                        }
                                                    }} className="text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
