import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>Home Screen</h1>
      <ul>
        {applications.map((app) => (
          <li key={app.id} onClick={() => handleApplicationSelect(app.id)}>
            {app.app_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;


