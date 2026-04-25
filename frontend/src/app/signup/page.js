'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNo: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const register = async ()=>{
    try{
        const response = await fetch("https://profiler-mspi.onrender.com/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if(response.ok){
            alert("Registration successful! Please log in.");
        }else{
            alert( "Registration failed");
        }

    } catch (error) {
        console.error("Error registering user:", error);
    }
  }

  return (
    <div className="container-main">
      <div className="card">
        <div className="text-center">
          <h1 className="title">Create Account</h1>
          <p className="subtitle">Join us and get started today</p>
        </div>

        <form>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-input"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              className="form-input"
              placeholder="Enter your phone number"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="button" onClick={register} className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Create Account
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
            Already have an account? <a href="/login" className="text-link">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
