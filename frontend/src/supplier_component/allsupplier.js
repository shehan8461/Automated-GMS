import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './allSuppliers.css';
import { useReactToPrint } from 'react-to-print';

function AllSupplier() {
  const [originalSupplierList, setOriginalSupplierList] = useState([]);
  const [supplierlist, setSupplierList] = useState([]);
  const [searchbtn, setSearchBtn] = useState('');
  const [showButtons, setShowButtons] = useState(true); // State variable to control button rendering
  const componentPDF = useRef();

  // Fetch data
  const getFetchDetails = async () => {
    try {
      const data = await axios.get('http://localhost:8080/supplier');
      if (data.data.success) {
        setOriginalSupplierList(data.data.data);
        setSupplierList(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFetchDetails();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    const data = await axios.delete(`http://localhost:8080/delete_supplier/${id}`);
    if (data.data.success) {
      getFetchDetails();
      alert('Deleted successfully');
    }
  };

  // Search Button
  const generateSearch = () => {
    const getData = originalSupplierList.filter((supplier) =>
      supplier.product.toLowerCase().includes(searchbtn.toLowerCase())
    );
    setSupplierList(getData);
  };

  // Generate PDF report
  const generatePDF = useReactToPrint({
    content: () => {
      // Clone the component content to manipulate
      const contentRef = componentPDF.current.cloneNode(true);
      // Remove specific columns from the cloned content
      const table = contentRef.querySelector('.supplier_table');
      if (table) {
        // Remove 'Place Orders', 'Update', and 'Delete' columns
        table.querySelectorAll('th:nth-child(8), td:nth-child(8)').forEach((cell) => cell.remove()); // Remove 'Place Orders' column
        table.querySelectorAll('th:nth-child(9), td:nth-child(9)').forEach((cell) => cell.remove()); // Remove 'Update' column
        table.querySelectorAll('th:nth-child(10), td:nth-child(10)').forEach((cell) => cell.remove()); // Remove 'Delete' column
      }
      return contentRef;
    },
    documentTitle: 'supplier_report.pdf',
    onBeforePrint: () => setShowButtons(false), // Hide buttons before printing
    onAfterPrint: () => setShowButtons(true), // Show buttons after printing
  });

  return (
    <div className='supplier_background'>
      <div className='container'>
        <input
          id='srchinput'
          type='search'
          onChange={(e) => setSearchBtn(e.target.value)}
          placeholder='Search'
          aria-label='Search'
        />

        <button onClick={generateSearch} className='srchbtn' type='submit'>
          Search
        </button>
      </div>

      <div ref={componentPDF} style={{ width: '100%' }}>
        <table className='supplier_table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>E-mail</th>
              <th>Product</th>
              <th>Type</th>
              <th>Unit Price</th>
              <th>Contract Start</th>
              <th>Contract End</th>
              {showButtons && <th>Place Orders</th>} {/* Conditionally render 'Place Orders' column */}
              {showButtons && <th>Update</th>} {/* Conditionally render 'Update' column */}
              {showButtons && <th>Delete</th>} {/* Conditionally render 'Delete' column */}
            </tr>
          </thead>
          <tbody>
            {supplierlist.map((e1) => (
              <tr key={e1._id}>
                <td>{e1.name}</td>
                <td>{e1.phone}</td>
                <td>{e1.email}</td>
                <td>{e1.product}</td>
                <td>{e1.type}</td>
                <td>{e1.unitPrice}</td>
                <td>{e1.contractStart}</td>
                <td>{e1.contractEnd}</td>
                {showButtons && (
                  <td>
                    <a href={`/order/${e1._id}`} className='btn1'>
                      Place Order
                    </a>
                  </td>
                )}
                {showButtons && (
                  <td>
                    <a href={`/update/${e1._id}`} className='btn1'>
                      Update
                    </a>
                  </td>
                )}
                {showButtons && (
                  <td>
                    <button onClick={() => handleDelete(e1._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={generatePDF} className='reportbtn' type='submit'>
        Generate Report
      </button>
    </div>
  );
}

export default AllSupplier;
