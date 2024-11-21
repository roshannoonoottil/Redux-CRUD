import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserHome.css';

function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.isAuthenticated); 

  console.log("user ========>",user);
  console.log("user Auth ========>",isAuth);


  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const authUser = await axios.get('http://localhost:3000/user/home');
        if (authUser.data.success) {
          dispatch({
            type: 'LOGIN', 
            payload: authUser.data.data,
          });
          setIsLoading(false);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/'); 
      }
    };

    fetchData();
  }, [isAuth, navigate, dispatch]);

  const logout = () => {
    localStorage.setItem('token', '');
    dispatch({
      type: 'LOGOUT', 
    });
    setRefresh(!refresh);
    navigate('/');
  };

  const editUser = () => {
    navigate('/editUser');
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="parentDiv">
      {isAuth && user ? ( 
        <>
          <img
            src={`http://localhost:3000${user.image}`}
            alt="profile"
            className="profile"
          />
          <div className="userInfo">
            <h2>{user.userName}</h2>
            <h4>{user.email}</h4>
            <h4>{user.mobile}</h4>
            <button onClick={logout} className="logoutButton">
              Log Out
            </button>
            <button onClick={editUser} className="loginButton">
              Edit User
            </button>
          </div>
        </>
      ) : (
        <div>Please log in to view this page.</div>
      )}
    </div>
  );
}

export default UserHome;
