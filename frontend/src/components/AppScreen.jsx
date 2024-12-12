import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    // Check for simultaneous tab usage
    const currentApp = localStorage.getItem('currentApp');
    if (currentApp && currentApp === id) {
      const userChoice = window.confirm(
        'You are already logged into another tab.\n\nDo you want to log out of the other tab?'
      );
      if (userChoice) {
        localStorage.setItem('currentApp', id);
      } else {
        navigate('/home');
      }
    } else {
      localStorage.setItem('currentApp', id);
    }

    // Clear the localStorage on component unmount
    return () => {
      const activeApp = localStorage.getItem('currentApp');
      if (activeApp === id) {
        localStorage.removeItem('currentApp');
      }
    };
  }, [id, navigate]);

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

