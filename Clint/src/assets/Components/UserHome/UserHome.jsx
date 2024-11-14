import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './UserHome.css'

function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [data,setData]=useState()

  const user = useSelector((state) => state.user)  || data
  const isAuth = useSelector((state) => state.isAuthenticated)

  const token = localStorage.getItem('token');
  if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log(isAuth,'isAuthenticated')
            const authUser = await axios.get('http://localhost:3000/user/home');
            if (!authUser.data.success ) {
                navigate('/login');
            } else {
               console.log(authUser,'---------------------image check')
               setData(authUser.data.data)
                dispatch({
                    type:'login',
                    payload:authUser.data.data
                })
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

const logout = async () => {
  localStorage.setItem('token', '');
  dispatch({
      type: 'LOGOUT'
  });
  setRefresh(!false)
  navigate('/');
};

const editUser = () => {
  navigate('/editUser');
};

if (isLoading) {
  return <div></div>;
}

if (!user) {
  return <div></div>;
}


  return (
    <div className="parentDiv">
            <img src={`http://localhost:3000${user.image}`} alt="profile" className="profile" />
            <div className="userInfo">
              <h2>{user.userName}</h2>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
                <h4>{user.mobile}</h4>
                <button onClick={logout} className="logoutButton">LogOut</button>
                <button onClick={editUser} className="loginButton">EditUser</button>
            </div>
        </div>
  )
}

export default UserHome
