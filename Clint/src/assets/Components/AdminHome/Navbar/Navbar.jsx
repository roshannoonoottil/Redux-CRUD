import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useDispatch, useSelector } from 'react-redux';


const NavBar = ({ onSearch }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const searchHandle = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };

    const logout = () => {
        localStorage.removeItem('crud_admintoken');
        window.location.href = '/admin';
        dispatch({ type: 'ADMIN_LOGOUT' });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <span className="navbar-brand">Admin Dashboard</span>
                <br />
                <div className="navbar-links">
                    {/* <a href="#action1" className="nav-link">Home</a> */}
                </div>
                <div className="navbar-search">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={searchHandle}
                        value={search}
                    />
                    <button className="btn btn-outline-danger" onClick={logout}>
                        LogOut
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
