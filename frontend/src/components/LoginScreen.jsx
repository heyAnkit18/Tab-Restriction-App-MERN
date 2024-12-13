import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './LoginScreen.css'; 
function LoginScreen() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const userData = JSON.parse(atob(credential.split('.')[1])); 
      const userId = userData.sub;
      const userName = userData.name;

      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);

      await axios.post('http://localhost:5000/api/log', {
        userId,
        action: 'Login',
        details: `User ${userName} logged in successfully via Google`,
      });

      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleError = () => {
    console.error('Login failed');
  };

  return (
    <GoogleOAuthProvider clientId="685914121022-6s8k2fie7vskafqkrekrd1hdpfv5rr85.apps.googleusercontent.com">
      <div className="login-screen">
        <h1 className="login-title">Login Screen</h1>
        <div className="google-login">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginScreen;


