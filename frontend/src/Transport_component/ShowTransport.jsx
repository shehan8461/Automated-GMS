import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import Spinner from './Spinner';

const ShowTransport = () => {
  const [transport, setTransport] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/transports/${id}`)
      .then((response) => {
        setTransport(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton/>
      <h1 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Selected Transportation Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <table style={{ borderCollapse: 'collapse', border: '1px solid #ccc', borderRadius: '0.5rem', marginLeft: '25%' }}>
          <tr style={{ background: '#5b5b61', color: 'white' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Field</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Value</th>
          </tr>

          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>JOB</b></td>
            <td style={{ padding: '1rem' }}>{transport.job}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>VEHICLE</b></td>
            <td style={{ padding: '1rem' }}>{transport.vehicle}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>VEHICLE NUMBER</b></td>
            <td style={{ padding: '1rem' }}>{transport.vehicleNumber}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>DRIVER</b></td>
            <td style={{ padding: '1rem' }}>{transport.driver}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>DATE</b></td>
            <td style={{ padding: '1rem' }}>{transport.date}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>TIME</b></td>
            <td style={{ padding: '1rem' }}>{transport.time}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>DESTINATION</b></td>
            <td style={{ padding: '1rem' }}>{transport.description}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>Create time</b></td>
            <td style={{ padding: '1rem' }}>{new Date(transport.createdAt).toString()}</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', color: '#808080' }}><b>Last Update time</b></td>
            <td style={{ padding: '1rem' }}>{new Date(transport.updatedAt).toString()}</td>
          </tr>
        </table>
      )}
    </div>
  );
}

export default ShowTransport;
