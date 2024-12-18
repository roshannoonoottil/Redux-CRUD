import React, { useState } from 'react';
import './UserRegister.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserRegister() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Updated handleImageChange with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file) {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Only JPG, JPEG, WEBP, and PNG files are allowed.",
        }));
        setImage(null);
        setImagePreview(null);
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "File size must be less than 2MB.",
        }));
        setImage(null);
        setImagePreview(null);
        return;
      }

      // If validations pass
      setImage(file);
      setImagePreview(URL.createObjectURL(file));

      // Clear any previous image errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!userName) validationErrors.userName = "Username is required";
    if (mobile.length !== 10) validationErrors.mobile = "Mobile number must be 10 digits";
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Invalid email address";
    }
    if (password.length < 6) validationErrors.password = "Password must be at least 6 characters";
    if (!image) validationErrors.image = "Profile image is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = {
        userName: '',
        mobile: '',
        email: '',
        password: '',
        image: ''
      };
      formData.userName = userName;
      formData.mobile = mobile;
      formData.email = email;
      formData.password = password;
      formData.image = image;
      console.log(formData, 'formdata');

      try {
        const response = await axios.post('http://localhost:3000/user/signup', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log(response);
        if (response.status === 200) {
          alert("Registration successful!");
          navigate('/');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      console.log("Form Data Submitted:", {
        userName,
        mobile,
        email,
        password,
        image,
      });
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
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <label>Password:</label>
        <input
          className='inp'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <label>Profile Image:</label>
        <input type="file" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
        {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

        <button style={{ marginTop: 40 }} type="submit">Register</button>
        <br />
        <p>Already a user? <span onClick={handleLogin} style={{ cursor: 'pointer' }}>Login</span></p>
      </form>
    </div>
  );
}

export default UserRegister;
