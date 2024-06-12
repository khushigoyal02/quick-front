import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [action, setAction]=useState("Login");

    const handleLogin = async () => {
        try {
          const response = await axios.post('/api/v1/login', { email, password });
          const  { userId }  = response.data;
          // Store the userId in localStorage
          localStorage.setItem('userId', userId );
          navigate('/');
          window.location.reload();
        } catch (err) {
          if (err.response && err.response.data.message === 'All fields must be filled') alert(err.response.data.message);
          if (err.response && err.response.data.message === 'Invalid Credentials') alert(err.response.data.message);
          console.error('Error logging in:', err);
        }
      };

      const handleSignup = async () => {
        try {
          const response = await axios.post('/api/v1/register', { name, email, password });
          const  { userId }  = response.data;
    
          // Store the userId in localStorage
          localStorage.setItem('userId', userId);
          navigate('/');
          window.location.reload();
        } catch (err) {
          if (err.response && err.response.data.message === 'All fields must be filled') alert(err.response.data.message);
          if (err.response && err.response.data.message === 'Email is not valid') alert(err.response.data.message);
          if (err.response && err.response.data.message === 'User already exists') alert(err.response.data.message);
          console.error('Error signing up:', err);
        }
      };

    function callonclick(){ action==="Login" ? handleLogin() : handleSignup() }

    function clear(){
        {action==="Login" ? setAction("Register") : setAction("Login")}
        if (action==="Login") {setName("");}
        setEmail("");
        setPassword("");
    }

  return (
    <div className='container'>
        <h2>{action}</h2>
        {action==="Login" ? <div></div> :
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />}

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

        <button onClick={callonclick}>{action}</button>

        {action==="Login" ? 
        <div className="text-center mt-3">
        <span>Don't have an account?</span>
        <button className="change text-primary m-0 p-0" onClick={clear}>Register</button>
        </div>:
        <div className="text-center mt-3">
        <span>Already have an account?</span>
        <button className="change text-primary m-0 p-0" onClick={clear}>Login</button>
        </div>}
    </div>
  )
}

export default Form
