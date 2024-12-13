import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css'; 

function HomeScreen() {
  const [applications, setApplications] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications');
        if (isMounted) {
          setApplications(response.data); 
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();

    return () => {
      isMounted = false; 
    };
  }, []);

  const handleApplicationSelect = (appId) => {
    navigate(`/app/${appId}`); 
  };

  return (
    <div className="home-screen">
      <h1 className="home-title">Home Screen</h1>
      <ul className="app-list">
        {applications.map((app) => (
          <li
            key={app.id}
            className="app-item"
            onClick={() => handleApplicationSelect(app.id)}
          >
            {app.app_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;


