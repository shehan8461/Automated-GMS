import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavigationBar';

const CreateTransports = () => {
  const [job, setJob] = useState('');
  const [driver, setDriver] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicle] = useState(true);
  const [costError, setCostError] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/vehicles')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setVehicles(response.data.data);
        } else {
          console.error('Invalid data format. Expected an array:', response.data);
        }
        setLoadingVehicle(false);
      })
      .catch((error) => {
        setLoadingVehicle(false);
        console.error('Error fetching vehicles:', error);
      });
  }, []);

  const handleSaveBook = () => {
    const selectedVehicleObject = vehicles.find((vehicleItem) => vehicleItem._id === selectedVehicle);

    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(driver)) {
      alert('Driver is not valid');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(date);
    if (selectedDate < currentDate) {
      alert('Cannot add previous dates');
      return;
    }

    if (selectedDate.toDateString() === currentDate.toDateString()) {
      const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
      const selectedTime = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
      if (selectedTime < currentTime) {
        alert('Cannot add previous time');
        return;
      }
    }

    const data = {
      job,
      vehicle: selectedVehicleObject ? selectedVehicleObject.vehicle : '',
      driver,
      vehicleNumber,
      date,
      time,
      cost,
      description,
    };

    setLoading(true);

    axios
      .post('http://localhost:8080/transports', data)
      .then(() => {
        setLoading(false);
        navigate('/transports');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.error(error);
      });
  };

  const handleVehicleSelect = (e) => {
    const selectedVehicleId = e.target.value;
    setSelectedVehicle(selectedVehicleId);

    const selectedVehicleObject = vehicles.find((vehicle) => vehicle._id === selectedVehicleId);
    if (selectedVehicleObject) {
      setVehicleNumber(selectedVehicleObject.vehicleNumber);
    }
  };

  const handleDriverChange = (e) => {
    setDriver(e.target.value);
  };

  const handleCostBlur = () => {
    const costValue = parseFloat(cost);
    if (isNaN(costValue) || costValue <= 0) {
      setCostError('Invalid Cost');
    } else {
      setCostError('');
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setDateError('Cannot select a past date');
    } else {
      setDateError('');
    }
    setDate(e.target.value);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <NavBar/>
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', marginTop: '1rem',textDecoration:'bold' ,marginRight:'15%'}}>CREATE TRANSPORT</h1><br></br>
      {loading ? <Spinner /> : ''}
      <div style={{ display: 'flex', flexDirection: 'column', width: '600px', margin: 'auto' ,border:'3px solid #565ad6',padding:'2%',borderRadius:'10px'}}>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <div style={{ flex: 1, marginRight: '0.5rem' }}>
            <label style={{ fontSize: '1.25rem', color: '#808080' }}>Job</label>
            <select
              value={job}
              onChange={(e) => setJob(e.target.value)}
              style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
            >
              <option value="STAFF">STAFF</option>
              <option value="PRODUCTION">PRODUCTION</option>
            </select>
          </div>
          <div style={{ flex: 1, marginLeft: '0.5rem', marginRight: '0.5rem' }}>
            <label style={{ fontSize: '1.25rem', color: '#808080' }}>Vehicle</label>
            {loadingVehicles ? (
              <Spinner />
            ) : (
              <select
                value={selectedVehicle}
                onChange={handleVehicleSelect}
                style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicleItem) => (
                  <option key={vehicleItem._id} value={vehicleItem._id}>
                    {vehicleItem.year} {vehicleItem.vehicle} - {vehicleItem.vehicleNumber}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div style={{ flex: 1, marginLeft: '0.5rem' }}>
            <label style={{ fontSize: '1.25rem', color: '#808080' }}>Driver</label>
            <select
              value={driver}
              onChange={(e) => setDriver(e.target.value)} 
              style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
            >
              <option value="">Select Driver</option>
              <option value="Nimal Perera">Nimal Perera</option>
              <option value="Sunil Perera">Sunil Perera</option>
              <option value="Lasantha Bandara">Lasantha Bandara</option>
              <option value="Kamal Rathnayake">Kamal Rathnayake</option>
              <option value="Duminda Jayaweera">Duminda Jayaweera</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#808080' }}>VehicleNo</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#808080' }}>Date</label>
          <input
            type='date'
            value={date}
            onChange={handleDateChange}
            style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
          />
          {dateError && <p style={{ color: '#FF0000' }}>{dateError}</p>}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#808080' }}>Time</label>
          <input
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#808080' }}>Cost</label>
          <input
            type='text'
            value={cost}
            onBlur={handleCostBlur} 
            onChange={(e) => setCost(e.target.value)}
            style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
          />
          {costError && <p style={{ color: '#FF0000' }}>{costError}</p>}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#808080' }}>Destination</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ border: '2px solid #808080', padding: '0.5rem', width: '100%' }}
            rows={2} 
          />
        </div>

        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#87CEEB', margin: '0.5rem auto', border: 'none' ,color:'white',backgroundColor:'#5255d1',borderRadius:'10px'}} onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateTransports;
