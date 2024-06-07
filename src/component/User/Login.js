import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email){
      alert("Enter your email")
    }
    else if (!password){
      alert("Enter your password");
    }
    try {
      const response = await axios.post('/api/v1/login', { email, password });
      if (response.data.status=='ok'){
        const  userId  = response.data.userId;
        // Store the userId in localStorage
        localStorage.setItem('userId', userId );
        navigate('/');
      }
      else{
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {/*<a className='link-primary' onClick={handleForgot}>Forgot Password?</a>*/}
    </div>
  );
};

export default Login;