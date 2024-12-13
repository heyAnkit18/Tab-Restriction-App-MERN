import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppScreen.css'; 

function AppScreen() {
  const { id } = useParams(); 
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the application details
    const fetchApplication = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications');
        const app = response.data.find((app) => app.id === id);
        if (app) {
          setApplication(app);
        } else {
          console.error('Application not found');
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  useEffect(() => {
    const handleStorageEvent = (event) => {
      if (event.key === 'currentApp' && event.newValue !== id) {
        navigate('/home');
      }
    };

    const displayConflictDialog = () => {
      const conflictDiv = document.createElement('div');
      conflictDiv.className = 'conflict-dialog';
      conflictDiv.innerHTML = `
        <p>You are already logged into another tab.</p>
        <button id="logout-other-tab">Log out of the other tab</button>
        <button id="cancel-action">Cancel</button>
      `;

      document.body.appendChild(conflictDiv);

      document.getElementById('logout-other-tab').onclick = () => {
        localStorage.setItem('currentApp', 'none');
        document.body.removeChild(conflictDiv);
        navigate('/home');
      };

      document.getElementById('cancel-action').onclick = () => {
        document.body.removeChild(conflictDiv);
        navigate('/home');
      };
    };

    const currentApp = localStorage.getItem('currentApp');

    if (currentApp && currentApp === id) {
      displayConflictDialog();
    } else {
      localStorage.setItem('currentApp', id);
    }

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      const activeApp = localStorage.getItem('currentApp');
      if (activeApp === id) {
        localStorage.removeItem('currentApp');
      }
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [id, navigate]);

  return (
    <div className="app-screen">
      {application ? (
        <>
          <h1 className="app-title">Application Screen</h1>
          <p className="app-detail"><strong>Application Name:</strong> {application.app_name}</p>
          <p className="app-detail"><strong>Application ID:</strong> {application.id}</p>
        </>
      ) : (
        <p className="loading">Loading application details...</p>
      )}
    </div>
  );
}

export default AppScreen;



