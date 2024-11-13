import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './UserLogin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function UserLogin() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();


  axios.defaults.withCredentials = true;

    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }


    useEffect(() => {
      const fetchData = async () => {
          try {
              const authUser = await axios.get('http://localhost:3000/user/home');
              if (authUser.data.success) {
                  navigate('/');
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Invalid email format";
    }
    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      console.log("Logged in with:", { email, password });
    }

    try {
      const response = await axios.post('http://localhost:3000/user/login', { email, password });
      // setSpinner(false);
      if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          dispatch({
              type: 'login',
              payload: response.data.data
          });
          navigate('/');
      } else {
          setErrors(response.data.message);
      }
  } catch (error) {
      // setSpinner(false);
      setErrors('Error logging in. Please try again.');
      console.error('Error logging in:', error);
  }
    

  };

  const register = () => {
    navigate('/signup');
};

  return (
    <div className="simple-login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Login</button>
        <br />
        <p >Don't have an account? <span onClick={register} style={{cursor:'pointer'}}>Signup</span></p>
      </form>
    </div>
  );
}

export default UserLogin
