import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BackButton from './BackButton';
import NavBar from './NavigationBar';
import bgImage from './bgImage.jpg';

const VehicleHome = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [originalVehicles, setOriginalVehicles] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setOriginalVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const searchHandle = () => {
    const filteredVehicles = originalVehicles.filter((vehicle) =>
      vehicle.vehicle.toLowerCase().includes(searchKey.toLowerCase())
    );
    setVehicles(filteredVehicles);
  };

  // Reset search
  const resetSearch = () => {
    setVehicles(originalVehicles);
    setSearchKey('');
  };

  // Format date to 'year/month/day' and time to 'hours:minutes'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column',width:'100%',border:'5px solid black' ,borderRadius:'10px' }}>
      <NavBar />
      <a href='/transports'><button style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back to Transports</button></a>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
    
        <h1 style={{ fontSize: '40px', margin: '0', fontWeight: 'bold' ,marginLeft:'35%'}}>Vehicle List</h1>
        <div>
          <Link to="/vehicles/create">
            <MdOutlineAddBox style={{ fontSize: '40px', color: '#17a2b8', cursor: 'pointer' }} />
          </Link>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search by Vehicle"
          style={{ width: '300px', height: '40px', marginRight: '10px', padding: '5px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={searchHandle} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Search</button>
        <button onClick={resetSearch} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Reset</button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table style={{ width: '95%' ,marginLeft:'12%',marginTop:'1%'}}>
          <thead>
            <tr>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>No</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Year</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Model</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Vehicle</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>VehicleNo</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left' }}>Rentered Company</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Rental fee</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Capacity</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Description</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Time & Date</th>
              <th style={{ padding: '5px', backgroundColor: '#6c757d', color: '#fff', border: '1px solid #dee2e6', textAlign: 'left'  }}>Opt</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle._id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left' }}>{index + 1}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left' }}>{vehicle.year}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left'}}>{vehicle.model}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left'}}>{vehicle.vehicle}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left' }}>{vehicle.vehicleNumber}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left' }}>{vehicle.renteredCompany}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left'}}>{vehicle.rentalFee}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left' }}>{vehicle.capacity}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left' }}>{vehicle.descriptionOfVehicle}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left'}}>{formatDate(vehicle.createdAt)}</td>
                <td style={{ padding: '5px', border: '1px solid #dee2e6', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`/vehicles/details/${vehicle._id}`} style={{ marginRight: '10px' }}>
                      <BsInfoCircle style={{ fontSize: '24px', color: '#28a745', cursor: 'pointer' }} />
                    </Link>
                    <Link to={`/vehicles/edit/${vehicle._id}`} style={{ marginRight: '10px' }}>
                      <AiOutlineEdit style={{ fontSize: '24px', color: '#ffc107', cursor: 'pointer' }} />
                    </Link>
                    <Link to={`/vehicles/delete/${vehicle._id}`}>
                      <MdOutlineDelete style={{ fontSize: '24px', color: '#dc3545', cursor: 'pointer' }} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
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

export default VehicleHome;
