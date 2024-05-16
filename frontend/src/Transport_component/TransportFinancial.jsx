import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsTaxiFrontFill } from 'react-icons/bs';
import NavigationBar from './NavigationBar';
import './Home.css';
import BackButton from './BackButton';
import { useReactToPrint } from 'react-to-print';


const TransportFinancial = () => {
    const componentPDF = useRef();
    const [transports, setTransports] = useState([]);
    const [originalTransports, setOriginalTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchkey, setSearchKey] = useState('');
    const [vehicleFilter, setVehicleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    
  
    useEffect(() => {
      setLoading(true);
      axios
        .get('http://localhost:8080/transports')
        .then((response) => {
          setTransports(response.data.data);
          setOriginalTransports(response.data.data); 
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);

    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: 'Transportation Log',
      onAfterPrint: () => alert('Data saved in PDF'),
    });
  
   
  return (
    <div style={{ padding: '1rem' }}>
    <NavigationBar /><br></br>
    <BackButton/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <h2 style={{ fontSize: '25px' }}>Transportation Log Page</h2>
</div>


    <div style={{ display: 'flex', alignItems: 'center' }}>
    <div>
    <button onClick={generatePDF} style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Generate PDF</button>&nbsp; 
</div>

   
  
</div>
    <br></br>

    {loading ? (
<Spinner />
) : (
<div ref={componentPDF} style={{ marginLeft: '20px', marginRight: '20px' }}><br></br>
  <table style={{ width: '80%',marginLeft:'1%' }}>
    <thead>
      <tr style={{ backgroundColor: '#a2b9bc' }}>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>No</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>Job</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>Vehicle</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>VehicleNo</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>Driver</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>Date</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>Time</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>Cost</th>
        <th style={{ border: '1px solid black', padding: '0.5rem' }}>Destination</th>
      </tr>
    </thead>
    <tbody>
      {transports.map((transport, index) => (
        <tr key={transport._id}>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>
            {index + 1}
          </td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.job}</td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.vehicle}</td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.vehicleNumber}</td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.driver}</td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>
            {new Date(transport.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.time}</td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.cost}</td>
          <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
)}
  </div>
  )
}

export default TransportFinancial
