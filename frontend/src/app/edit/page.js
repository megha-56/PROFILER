'use client';

import { useState, useEffect } from 'react';


export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNo: '',
    bio: '',
    skills: '',
    gender: '',
    dob: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

//   useEffect(() => {
//     const username = localStorage.getItem('username');
//     if (username) {
//       setFormData(prev => ({
//         ...prev,
//         username: username
//       }));
//       fetchUserProfile(username);
//     }
//   }, []);

//   const fetchUserProfile = async (username) => {
//     try {
//       const response = await fetch(`https://profiler-mspi.onrender.com/api/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         setFormData(prev => ({
//           ...prev,
//           name: data.user.name || '',
//           email: data.user.email || '',
//           phoneNo: data.user.phoneNo || '',
//           username: data.user.username || '',
//           bio: data.user.bio || '',
//           skills: data.user.skills || '',
//           gender: data.user.gender || '',
//           dob: data.user.dob || '',
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

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
            setFormData(data.user);
        }else{
            alert( "Failed to fetch profile data");
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
  }

  useEffect(()=>{
    fetchProfile()
},[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://profiler-mspi.onrender.com/api/user/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setTimeout(() => {
        //   window.location.href = '/dashboard';
        }, 1500);
      } else {
        setMessage(data.message || 'Update failed. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
    
//     try {
//       const response = await fetch('https://profiler-mspi.onrender.com/api/user/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Profile updated successfully!');
//         setTimeout(() => {
//           window.location.href = '/dashboard';
//         }, 1500);
//       } else {
//         setMessage(data.message || 'Update failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setMessage('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleCancel = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="container-main  ">
      <div className=" card ">
        <div  className="text-center">
          <h1 className="title">Edit Profile</h1>
          <p className="subtitle">Update your profile information</p>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={formData.username}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
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
              required
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
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-input"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-input"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea
              name="bio"
              className="form-input"
              placeholder="Enter your Bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              className="form-input"
              placeholder="Enter your phone number"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div> */}

          <div className="button-group">
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* <style jsx>{`
        .text-center {
          text-align: center;
          margin-bottom: 30px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: var(--text-gray);
        }

        .message {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .message.success {
          background-color: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .message.error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .button-group {
          display: flex;
          gap: 12px;
          margin-top: 30px;
        }

        .btn-primary,
        .btn-secondary {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background-color: var(--bg-light);
          color: var(--text-dark);
          border: 1px solid var(--border-light);
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: var(--border-light);
          transform: translateY(-2px);
        }

        .btn-secondary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        .form-textarea {
          resize: vertical;
          font-family: 'Poppins', sans-serif;
          padding: 12px 16px;
        }

        .form-input[type="date"],
        .form-input[type="tel"],
        select.form-input {
          cursor: pointer;
        }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 20px;
          padding-right: 40px;
          textarea,

      `}</style> */}
      <style jsx>{`
  .container-main {
    min-height: 100vh;
     height: auto;  
    display: flex;
    justify-content: center;
    // 
    align-items: flex-start;
    padding: 20px;
  }

  .card {
    width: 100%;
    max-width: 500px;
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-sizing: border-box;
    
    
  }

  .form-input,
  textarea,
  select {
    width: 100%;
    box-sizing: border-box;
  }

  .text-center {
    text-align: center;
    margin-bottom: 30px;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 14px;
    color: var(--text-gray);
  }

  .message {
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 500;
  }

  .message.success {
    background-color: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }

  .message.error {
    background-color: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  .button-group {
    display: flex;
    gap: 12px;
    margin-top: 30px;
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
  }

  .btn-secondary {
    background-color: var(--bg-light);
    color: var(--text-dark);
    border: 1px solid var(--border-light);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  select.form-input {
    appearance: none;
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 20px;
    padding-right: 40px;
  }
`}</style>
    </div>
  );
}
