import React, { useState } from 'react';
import './UserRegister.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function UserRegister() {
  
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const validationErrors = {};
      if (!userName) validationErrors.userName = "Username is required";
      if (mobile.length !== 10) validationErrors.mobile = "Mobile number must be 10 digits";
      if (!email) { validationErrors.email = "Email is required";
      }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        validationErrors.email = "Invalid email address";
      }
      if (password.length < 6) validationErrors.password = "Password must be at least 6 characters";
      if (!image) validationErrors.image = "Profile image is required";
  
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length === 0) {
        const formData =  {
          userName:'',
          mobile:'',
          email:'',
          password:'',
          image: ''
        };
        formData.userName= userName;
        formData.mobile =  mobile;
        formData.email= email;
        formData.password= password;
        formData.image = image;
        console.log(formData,'formdata')

        try {
          const response = await axios.post('http://localhost:3000/user/signup',formData );
          console.log(response);
          if (response.status === 200) {
            alert("Registration successful!");
              navigate('/login');
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
      navigate('/login');
  };
  
    return (
      <div className="simple-register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
          />
          {errors.userName && <p style={{ color: "red" }}>{errors.userName}</p>}
  
          <label>Mobile:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
          />
          {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
  
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
  
          <label>Password:</label>
          <input
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
  
          <button type="submit">Register</button>
          <br />
          <p onClick={handleLogin} style={{cursor:'pointer'}}>Already a user? Login.</p>
        </form>
      </div>
    );
}

export default UserRegister

