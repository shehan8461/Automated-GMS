import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import Spinner from './Spinner';

const ShowVehicles = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Show Vehicle</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ border: '2px solid #4fd1c5', borderRadius: '10px', padding: '1rem', width: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0', width: '20%' }}>Id</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle._id}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Year</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.year}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Model</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.vehicle}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Vehicle</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.vehicle}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>VehicleNo</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.vehicleNumber}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Rentered Company</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.renteredCompany}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Rental Fee</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.rentalFee}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Capacity</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.capacity}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Description</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{vehicle.descriptionOfVehicle}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Create time</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{new Date(vehicle.createdAt).toString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>Last Update time</td>
                <td style={{ padding: '0.5rem', border: '1px solid #cbd5e0' }}>{new Date(vehicle.updatedAt).toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ShowVehicles;
