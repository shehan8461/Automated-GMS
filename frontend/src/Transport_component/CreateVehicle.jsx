import React, { useState } from 'react';
import BackButton2 from './BackButton2';
import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavigationBar';

const CreateVehicle = () => {
  const [year, setYear] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [renteredCompany, setRenteredCompany] = useState('');
  const [rentalFee, setRentalFee] = useState('');
  const [capacity, setCapacity] = useState('');
  const [capacityPrefix, setCapacityPrefix] = useState('Passengers'); 
  const [model, setModel] = useState('');
  const [descriptionOfVehicle, setDescriptionOfVehicle] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicleNumberError, setVehicleNumberError] = useState('');
  const [rentalFeeError, setRentalFeeError] = useState('');
  const [capacityError, setCapacityError] = useState('');
  const navigate = useNavigate();

  const isValidVehicleNumber = (input) => {
    const regex = /^[A-Z0-9]{2,3}-\d{4}$/;
    return regex.test(input);
  };

  const handleSaveVehicle = () => {
    const rentalFeeValue = parseFloat(rentalFee);
    const capacityValue = parseFloat(capacity);

    if (!isValidVehicleNumber(vehicleNumber)) {
      setVehicleNumberError('Invalid Number Plate. Valid: ABC - 9987');
      return;
    }

    if (isNaN(rentalFeeValue) || rentalFeeValue <= 0) {
      setRentalFeeError('Rental Fee must be a valid number greater than 0.');
      return;
    }

    if (isNaN(capacityValue) || capacityValue <= 0) {
      setCapacityError('Capacity must be a valid number greater than 0.');
      return;
    }

    setLoading(true);

    const data = {
      year,
      vehicle,
      vehicleNumber,
      renteredCompany,
      rentalFee: rentalFeeValue,
      capacity: `${capacityPrefix} ${capacity}`,
      model,
      descriptionOfVehicle,
    };

    axios
      .post('http://localhost:8080/vehicles', data)
      .then(() => {
        setLoading(false);
        navigate('/vehicles');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console for details.');
        console.error('Error saving vehicle:', error);
      });
  };

  const handleVehicleNumberBlur = (e) => {
    const input = e.target.value;
    if (!isValidVehicleNumber(input)) {
      setVehicleNumberError('Invalid Number Plate. Valid: ABC - 9987');
    } else {
      setVehicleNumberError('');
    }
  };

  const handleRentalFeeBlur = (e) => {
    const input = e.target.value;
    const rentalFeeValue = parseFloat(input);
    if (isNaN(rentalFeeValue) || rentalFeeValue <= 0) {
      setRentalFeeError('Rental Fee must be a valid number greater than 0.');
    } else {
      setRentalFeeError('');
    }
  };

  const handleCapacityBlur = (e) => {
    const input = e.target.value;
    const capacityValue = parseFloat(input);
    if (isNaN(capacityValue) || capacityValue <= 0) {
      setCapacityError('Capacity must be a valid number greater than 0.');
    } else {
      setCapacityError('');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <NavBar/>
      <BackButton2/>
      <a href='/vehicles'><button>《《《</button></a>
      <hr style={{ border: 'none', backgroundColor: 'blue', height: '10px' }} />

      <h1 style={{ marginLeft: '5%' }}>Create Vehicle Log</h1>
      {loading && <Spinner />}
      <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px' }}>
        <div style={{ border: '2px solid #87CEFA', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '800px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Year</label>
            <input
              type="date"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '10px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '10px', width: '100%' }}
            >
              <option value="">Select a model</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Van">Van</option>
              <option value="Truck">Truck</option>
              <option value="Cab">Cab</option>
              <option value="Bus">Bus</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Vehicle</label>
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '10px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Vehicle No</label>
            <input
              type="text"
              value={vehicleNumber}
              onBlur={handleVehicleNumberBlur} 
              onChange={(e) => setVehicleNumber(e.target.value)}
              style={{ border: `2px solid ${vehicleNumberError ? 'red' : '#ccc'}`, padding: '10px', width: '100%' }}
            />
            {vehicleNumberError && <p style={{ color: 'red' }}>{vehicleNumberError}</p>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Rented Company</label>
            <input
              type="text"
              value={renteredCompany}
              onChange={(e) => setRenteredCompany(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '10px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Rental Fee</label>
            <input
              type="text"
              value={rentalFee}
              onBlur={handleRentalFeeBlur}
              onChange={(e) => setRentalFee(e.target.value)}
              style={{ border: `2px solid ${rentalFeeError ? 'red' : '#ccc'}`, padding: '10px', width: '100%' }}
            />
            {rentalFeeError && <p style={{ color: 'red' }}>{rentalFeeError}</p>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Capacity</label>
            <input
              type="text"
              value={capacity}
              onBlur={handleCapacityBlur}
              onChange={(e) => setCapacity(e.target.value)}
              style={{ border: `2px solid ${capacityError ? 'red' : '#ccc'}`, padding: '10px', width: '100%' }}
            />
            {capacityError && <p style={{ color: 'red' }}>{capacityError}</p>}
            <select
              value={capacityPrefix}
              onChange={(e) => setCapacityPrefix(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '10px', marginTop: '10px', width: '100%' }}
            >
              <option value="Passengers">Passengers</option>
              <option value="TON">TON</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Description</label>
            <textarea
              value={descriptionOfVehicle}
              onChange={(e) => setDescriptionOfVehicle(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '10px', width: '100%', height: '100px' }}
            />
          </div>
          <button
            style={{ padding: '10px 20px', backgroundColor: '#87CEFA', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
            onClick={handleSaveVehicle}
          >
            Save
          </button>
        </div><br></br><br></br> <footer style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
      <span style={{ fontSize: '14px' }}>
        &copy; Copyright &copy;2024 All rights reserved {' '}
        <a href="https://Selyn.com" style={{ color: '#fff', textDecoration: 'none' }}>
          Seylin.com
        </a>
      </span>
    </footer>
      </div>
    </div>
  );
};

export default CreateVehicle;
