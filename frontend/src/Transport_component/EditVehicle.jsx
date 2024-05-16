import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditVehicle = () => {
  const [year, setYear] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [model, setModel] = useState(null);
  const [renteredCompany, setRenteredCompany] = useState(null);
  const [rentalFee, setRentalFee] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [descriptionOfVehicle, setDescriptionOfVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/vehicles/${id}`)
      .then((response) => {
        const data = response.data;
        setYear(data.year || null);
        setVehicle(data.vehicle || null);
        setModel(data.model || null);
        setVehicleNumber(data.vehicleNumber || null);
        setRenteredCompany(data.renteredCompany || null);
        setRentalFee(data.rentalFee || null);
        setCapacity(data.capacity || null);
        setDescriptionOfVehicle(data.descriptionOfVehicle || null);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.log(error);
      })
  }, [id])

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push(i);
    }
    return years;
  };

  const isValidVehicleNumber = (input) => {
    const regex = /^[A-Z]{2,3}-\d{4}$/;
    return regex.test(input);
  };

  const handleEditBook = () => {

    const inputYear = parseInt(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(inputYear) || inputYear < 1000 || inputYear > currentYear) {
      alert('Invalid year input. Please enter a valid year.');
      return;
    }

    if (!isValidVehicleNumber(vehicleNumber)) {
      alert(
        'Invalid Vehicle Number input. Please enter a valid vehicle number in the format: ABC-1234'
      );
      return;
    }


    const data = {
      year,
      vehicle,
      vehicleNumber,
      model,
      renteredCompany,
      rentalFee,
      capacity,
      descriptionOfVehicle,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8080/vehicles/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/vehicles');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. please Check console');
        console.log(error);
      });
  }

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Edit Vehicle Details</h1>
      {loading ? <Spinner /> : ''}
      <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid #4fd1c5', borderRadius: '10px', width: '600px', padding: '1rem', margin: '0 auto' }}>
        <div style={{ marginTop: '1rem',marginBottom: '1rem'}}>
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
          >
            <option value="">Select Year</option>
            {generateYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="my-4">
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
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

        <div className='my-4'>
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>Vehicle</label>
          <input
            type='text'
            value={vehicle || ''}
            onChange={(e) => setVehicle(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div className='my-4'>
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>VehicleNo</label>
          <input
            type='text'
            value={vehicleNumber || ''}
            onChange={(e) => setVehicleNumber(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div className='my-4'>
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>Rentered Company</label>
          <input
            type='text'
            value={renteredCompany || ''}
            onChange={(e) => setRenteredCompany(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div className='my-4'>
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>Rental Fee</label>
          <input
            type='text'
            value={rentalFee || ''}
            onChange={(e) => setRentalFee(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div className='my-4'>
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>Capacity</label>
          <input
            type='text'
            value={capacity || ''}
            onChange={(e) => setCapacity(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div className='my-4'>
          <label style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#718096' }}>Description</label>
          <input
            type='text'
            value={descriptionOfVehicle || ''}
            onChange={(e) => setDescriptionOfVehicle(e.target.value)}
            style={{ border: '2px solid #cbd5e0', padding: '0.5rem', width: '100%' }}
          />
        </div>
        <button style={{ padding: '0.5rem', backgroundColor: '#4fd1c5', margin: '0.5rem', color: '#fff', cursor: 'pointer' }} onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditVehicle;
