import React, { useEffect, useState } from 'react'
import './UserEdit.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserEdit() {


    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [newImage,setNewImage]=useState(null);

    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/home');
                const userData = response.data;
                setUserId(userData.data._id);
                
                setUserName(userData.data.userName);
                setMobile(userData.data.mobile);
                setEmail(userData.data.email);
                setImagePreview(userData.data.image);

                console.log(userData,'------edit user data')
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setNewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!userName) validationErrors.userName = "Username is required";
        // if (mobile.length !== 10) validationErrors.mobile = "Mobile number must be 10 digits";
        if (!email) {
            validationErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "Invalid email address";
        }
        if (!image && !imagePreview) validationErrors.image = "Profile image is required";

        setErrors(validationErrors);


        console.log("Form Data Submitted:", {
            userName,
            mobile,
            email,
            image,
          });
    

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("userName", userName);
            formData.append("mobile", mobile);
            formData.append("email", email);
            if (image) formData.append("image", image);

            try {
                const response = await axios.post('http://localhost:3000/user/editUser', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    alert("Profile updated successfully!");
                    navigate('/home'); 
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    const handleCancel = () => {
        navigate('/home');
    };

    return (
        <div className="simple-register-form">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    className='inp'
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your username"
                />
                {errors.userName && <p style={{ color: "red" }}>{errors.userName}</p>}

                <label>Mobile:</label>
                <input
                    className='inp'
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                />
                {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}

                <label>Email:</label>
                <input
                    className='inp'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                <label>Profile Image:</label>
                <input type="file" onChange={handleImageChange} />
                {imagePreview && (
                    <>
                    {
                        newImage ?
                        <img src={newImage} 
                        alt='NewImage'
                        style={{ width: "100px", height: "100px", marginTop: "10px" }} />
                        :
                        <img
                        src={`http://localhost:3000${imagePreview}` || imagePreview}
                        alt="Profile Preview"
                        style={{ width: "100px", height: "100px", marginTop: "10px" }}
                    />
                    }
                    
                    </>
                )}
                {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

                <button style={{ marginTop: 20 }} type="submit">Update Profile</button>
                <button style={{ marginTop: 20, marginLeft: 10 }} type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}



export default UserEdit
