'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNo: '+1 (555) 123-4567',
    gender: 'Male',
    username: 'johndoe',
    dob: '1995-06-15',
    bio: 'Passionate developer and tech enthusiast. Love building innovative solutions and collaborating with amazing teams.',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'UI/UX Design', 'Web Development']
  });


  //api
  const fetchProfile = async()=>{
    try{
        const username = localStorage.getItem("username");
        
        const response = await fetch("https://profiler-mspi.onrender.com/api/user/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username})})

        const data = await response.json();
        if(response.ok){
            setProfileData(data.user);
        }else{
            alert( "Failed to fetch profile data");
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
  }
  useEffect(()=>{
    fetchProfile();
  }, [])


  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-light)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>My Profile</h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '16px' }}>Welcome back! Here's your profile information</p>
        </div>

        {/* Profile Card */}
        <div className="card" style={{ maxWidth: 'none', marginBottom: '30px' }}>
          {/* Profile Header */}
          <div className="dashboard-header">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="profile-avatar">👤</div>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '5px' }}>{profileData.name}</h2>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>@{profileData.username}</p>
              </div>
            </div>
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
              Edit Profile
            </button>
          </div>

          {/* Personal Information Grid */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--text-dark)' }}>Personal Information</h3>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-label">Email</div>
                <div className="info-value">{profileData.email}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Phone Number</div>
                <div className="info-value">{profileData.phoneNo}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Gender</div>
                <div className="info-value">{profileData.gender}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Date of Birth</div>
                <div className="info-value">{profileData.dob}</div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--text-dark)' }}>Bio</h3>
            <div className="bio-text">
              {profileData.bio}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--text-dark)' }}>Skills</h3>
            <div className="skills-container">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="skill-badge">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
          <button className="btn-primary">Update Profile</button>
          <button style={{ 
            backgroundColor: 'transparent', 
            border: '2px solid var(--primary-color)', 
            color: 'var(--primary-color)',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            transition: 'all 0.3s'
          }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
