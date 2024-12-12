// src/components/AppScreen.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppScreen() {
  const { id } = useParams(); 
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/applications')
      .then((response) => {
        const app = response.data.find((app) => app.id === id); 
        setApplication(app);
      })
      .catch((error) => console.error('Error fetching applications:', error));
  }, [id]);

  const handleSimultaneousTabCheck = () => {
    const otherTabOpen = false; 
    if (otherTabOpen) {
      const proceed = window.confirm(
        'You are already logged into another tab. Do you want to log out of the other tab?'
      );
      if (proceed) {
        alert('Logged out of the other tab.');
      }
      navigate('/home');
    }
  };

  useEffect(() => {
    handleSimultaneousTabCheck();
  }, []);

  return (
    <div>
      {application ? (
        <>
          <h1>Application Screen</h1>
          <p><strong>Application Name:</strong> {application.app_name}</p>
          <p><strong>Application ID:</strong> {application.id}</p>
        </>
      ) : (
        <p>Loading application details...</p>
      )}
    </div>
  );
}

export default AppScreen;

