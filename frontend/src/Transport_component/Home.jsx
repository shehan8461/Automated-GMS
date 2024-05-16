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
import TransportFinancial from './TransportFinancial';
import bgImage from './bgImage.jpg'

const Home = () => {
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

  
  const searchHandle = () => {
    transportationData(searchkey);
  };

  const transportationData = (searchkey) => {
    const transportationData = originalTransports.filter((transport) =>
      transport.vehicle.toLowerCase().includes(searchkey.toLowerCase())
    );
    setTransports(transportationData);
  };

  
  const resetSearch = () => {
    setTransports(originalTransports);
    setSearchKey('');
  };

  
  const filterByVehicle = () => {
    const filteredData = originalTransports.filter((transport) =>
      transport.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase())
    );
    setTransports(filteredData);
  };

 
  const filterByDate = () => {
    const filteredData = originalTransports.filter((transport) =>
      transport.date.includes(dateFilter)
    );
    setTransports(filteredData);
  };

 
  const resetFilters = () => {
    setVehicleFilter('');
    setDateFilter('');
    setTransports(originalTransports);
  };

 
  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column',width:'100%',marginLeft:'0px',marginRight:'0px',border:'5px solid black' ,borderRadius:'10px'}}>
      <NavigationBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginTop:'3px' }}>
        <h2 style={{ fontSize: '25px' }}>Manage All The Transportation Here ,</h2>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Link to="/transports/create">
            <MdOutlineAddBox style={{ color: 'black', fontSize: '40px' }} />
          </Link>
          <Link to="/vehicles">
            <BsTaxiFrontFill style={{ color: 'black', fontSize: '40px' }} />
          </Link>
        </div>
      </div>
  
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id="searchPlaceHolder"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type="search"
          value={searchkey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search by Vehicle"
          style={{ width: '200px', height: '35px', marginRight: '5px' }}
        />
        <button
          id="search-btn"
          onClick={searchHandle}
          style={{ fontSize: '15px', marginRight: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
        >
          Search
        </button>
        <button
          onClick={resetSearch}
          style={{ fontSize: '15px', backgroundColor: '#DC3545', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
        >
          Reset
        </button>
  
        <select
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          style={{ width: '150px', marginLeft: '450px' }}
          className="form-control"
        >
          <option value="">Filter by vehicle</option>
          {transports.map((transport) => (
            <option key={transport._id} value={transport.vehicle}>
              {transport.vehicle}
            </option>
          ))}
        </select>
       &nbsp;
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{ marginRight: '5px', width: '150px' }}
          className="form-control"
        />
        <button onClick={filterByDate} style={{ marginRight: '5px', color: '#fff', backgroundColor: '#FFC107', border: 'none', borderRadius: '5px', padding: '5px 10px' }}> Filter</button>
        <button onClick={resetFilters} style={{ backgroundColor: '#6C757D', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>Reset</button>
      </div>
  

      <div>
        <Link to="/financial">
          <button style={{ backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>Go to Transport Report Page</button>
        </Link>
      </div>
      <div>
  
      </div>
 
  
      {loading ? (
        <Spinner />
      ) : (
        <div ref={componentPDF} style={{ width: '100%' }}>
          <table style={{ width: '80%' ,marginLeft:'1%',marginTop:'1%'}}>
            <thead>
              <tr style={{ backgroundColor: '#a2b9bc' }}>
                <th style={{ border: '1px solid black', padding: '10px' }}>No</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Job</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Vehicle</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>VehicleNo</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Driver</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Time</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Cost</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Destination</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Opt</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((transport, index) => (
                <tr key={transport._id}>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.job}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.vehicle}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.vehicleNumber}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.driver}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    {new Date(transport.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.time}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.cost}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.description}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                      <Link to={`/transports/details/${transport._id}`}>
                        <BsInfoCircle style={{ fontSize: '20px', color: '#008000' }} />
                      </Link>
                      <Link to={`/transports/edit/${transport._id}`}>
                        <AiOutlineEdit style={{ fontSize: '20px', color: '#FFD700' }} />
                      </Link>
                      <Link to={`/transports/delete/${transport._id}`}>
                        <MdOutlineDelete style={{ fontSize: '20px', color: '#FF4500' }} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br></br><br></br>
          <h1 style={{marginRight:'25%'  }}>Transportation Summary</h1>
          <table style={{ borderCollapse: 'collapse', width: '50%', border: '1px solid black',marginLeft:'30%',marginTop:'2%' ,textAlign:'center'}}>
  <tr style={{ backgroundColor: '#a2b9bc' }}>
    <th style={{ border: '1px solid black', padding: '5px' ,textAlign:'center'}}>Total Transportations</th>
    <th style={{ border: '1px solid black', padding: '5px', textAlign:'center'}}>Total Vehicles</th>
  </tr>
  <tr>
    <td style={{ border: '1px solid black', padding: '5px',textAlign:'center' }}>{transports.length}</td>
    <td style={{ border: '1px solid black', padding: '5px',textAlign:'center' }}>12</td>
  </tr>
</table>
        </div>
      )}<br></br><br></br> <footer style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
      <span style={{ fontSize: '14px' }}>
        &copy; Copyright &copy;2024 All rights reserved {' '}
        <a href="https://Selyn.com" style={{ color: '#fff', textDecoration: 'none' }}>
          Seylin.com
        </a>
      </span>
    </footer>
    </div>
  );
};

export default Home;
