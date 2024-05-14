import React, { useState } from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteVehicles = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteVehicle = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/vehicles/${id}`);
      setLoading(false);
      navigate('/vehicles');
    } catch (error) {
      setLoading(false);
      alert('An error happened. Please check the console.');
      console.log(error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Delete Vehicle</h1>
      {loading ? <Spinner /> : ''}
      <div style={{ border: '2px solid #4fd1c5', borderRadius: '10px', padding: '2rem', width: '600px', margin: 'auto' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Are You Sure Want To Delete This Vehicle?</h3>
        <button style={{ padding: '1rem', backgroundColor: '#ef4444', color: '#fff', margin: '0.5rem', width: '100%' }} onClick={handleDeleteVehicle}>
          Yes, Delete It.
        </button>
      </div>
    </div>
  );
};

export default DeleteVehicles;
