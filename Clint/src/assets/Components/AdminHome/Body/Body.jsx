import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Body.css';

const Body = ({ searchData }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/home');
                if (response.data.success) {
                    const data = response.data.userData;
                    setUserData(data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const deleteUser = async (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }
            try {
                const response = await axios.post('http://localhost:3000/admin/deleteUser', { email });
                if (response.data.success) {
                    setUserData(userData.filter(user => user.email !== email));
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        });
    };

    const filteredUserData = userData.filter(user =>
        user.userName.toLowerCase().includes(searchData.toLowerCase())
    );

    return (
        <div className="body-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>User</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserData.map((user, index) => (
                        <tr key={user.email}>
                            <td>{index + 1}</td>
                            <td><img src={`http://localhost:3000${user.image}` || user.image} alt="User" className="user-image" /></td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="delete-btn" onClick={() => deleteUser(user.email)}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h6 style={{color:'red'}}>Users Count : {filteredUserData.length}</h6>
        </div>
    );
};

export default Body;
