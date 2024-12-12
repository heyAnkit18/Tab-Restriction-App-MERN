import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AppScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  return (
    <div>
      <h1>Application Screen</h1>
      <p>Application ID: {id}</p>
    </div>
  );
}

export default AppScreen;
