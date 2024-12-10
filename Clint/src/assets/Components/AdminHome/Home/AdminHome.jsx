import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Navbar/Navbar';
import Body from '../Body/Body';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const AdminHome = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [searchData, setsearchData] = useState('');

    const admin = useSelector((state) => state.admin)
    const isAuth = useSelector((state) => state.isAdmin)

    console.log("admin ========>",admin);
    console.log("admin Auth ========>",isAuth);

    

    const handelSearch = (data) => {
        setsearchData(data);
    };

    const token = localStorage.getItem('admintoken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    

    useEffect(() => {

        if (!isAuth) {
            navigate('/admin');
            return;
          }


        const fetchData = async () => {
            try {
                const authUser = await axios.get('http://localhost:3000/admin/home');
                console.log(authUser, 'authuser./././././././');
                if (authUser.data.success) {
                    navigate('/adminhome')
                } else {
                    navigate('/admin')
                    dispatch({type:'ADMIN_LOGOUT'})
                    console.log('error');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <NavBar onSearch={handelSearch} />
            <Body searchData={searchData} />
        </div>
    )
}

export default AdminHome
