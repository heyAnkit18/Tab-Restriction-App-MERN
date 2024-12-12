import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate Google Login
    alert('Logged in successfully');
    navigate('/home');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login via Google</button>
    </div>
  );
}

export default LoginScreen;
