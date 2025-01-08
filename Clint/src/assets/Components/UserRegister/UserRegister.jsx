import React, { useState } from 'react';
import './UserRegister.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function UserRegister() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, WEBP, and PNG files are allowed.");
        setImage(null);
        setImagePreview(null);
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size must be less than 2MB.");
        setImage(null);
        setImagePreview(null);
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName) {
      toast.error("Username is required");
      return;
    }
    if (mobile.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!image) {
      toast.error("Profile image is required");
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);

    try {
      const response = await axios.post('http://localhost:3000/user/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error uploading file: " + error.response.data);
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="simple-register-form">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          className='inp'
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
        />

        <label>Mobile:</label>
        <input
          className='inp'
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter your mobile number"
        />

        <label>Email:</label>
        <input
          className='inp'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <input
          className='inp'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <label>Profile Image:</label>
        <input type="file" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}

        <button style={{ marginTop: 40 }} type="submit">Register</button>
        <br />
        <p>Already a user? <span onClick={handleLogin} style={{ cursor: 'pointer' }}>Login</span></p>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default UserRegister;
