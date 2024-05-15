import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavigationBar';

const validateAndFormatTime = (inputTime) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (timeRegex.test(inputTime)) {
    return inputTime;
  } else {
    return '';
  }
}

const EditTransport = () => {
  const [job, setJob] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [driver, setDriver] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/transports/${id}`)
      .then((response) => {
        const data = response.data;
        setJob(data.job);
        setVehicle(data.vehicle);
        setDriver(data.driver);
        setVehicleNumber(data.vehicleNumber);
        setDate(new Date(data.date).toISOString().split('T')[0]);
        setTime(data.time);
        setCost(data.cost);
        setDescription(data.description);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditTransport = () => {
    const formattedTime = validateAndFormatTime(time);

    if (formattedTime === '') {
      alert('Invalid time format. Please enter a valid time.');
      return;
    }

    const data = {
      job,
      vehicle,
      driver,
      vehicleNumber,
      date,
      time: formattedTime,
      cost,
      description,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8080/transports/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/transports');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.log(error);
      });
  }

  return (
    <div style={{ padding: '1rem' }}>
      <NavBar/>
      <BackButton />
      
      <h1 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Edit Transport</h1>
      {loading ? <Spinner /> : ''}
      <div style={{ border: '2px solid #4fd1c5', borderRadius: '10px', width: '600px', margin: 'auto', padding: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>Job</label>
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          >
            <option value="STAFF">STAFF</option>
            <option value="PRODUCTION">PRODUCTION</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>Vehicle</label>
          <input
            type='text'
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>Driver</label>
          <select
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          >
            <option value="">Select Driver</option>
            <option value="Nimal Perera">Nimal Perera</option>
            <option value="Sunil Perera">Sunil Perera</option>
            <option value="Lasantha Bandara">Lasantha Bandara</option>
            <option value="Kamal Rathnayake">Kamal Rathnayake</option>
            <option value="Duminda Jayaweera">Duminda Jayaweera</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>VehicleNo</label>
          <input
            type='text'
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>Time</label>
          <input
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>Cost</label>
          <input
            type='text'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.25rem', marginRight: '0.5rem', color: '#4b5563' }}>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
          />
        </div>
        <button style={{ padding: '0.5rem', backgroundColor: '#93c5fd', color: '#1e3a8a', border: 'none', cursor: 'pointer', width: '100%' }} onClick={handleEditTransport}>
          Edit
        </button>
      </div>
    </div>
  )
}

export default EditTransport;
