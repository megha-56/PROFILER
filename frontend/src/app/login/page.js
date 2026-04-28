'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //api
  const login = async ()=>{
    try{ //fetch,{method,headers,body}
        const response = await fetch("https://profiler-mspi.onrender.com/api/user/login", //backend Server->/api/user/login->loginUser Function runs  //url(after render)+route(of our backend), coma(',') is must
            { 
            method: "POST", //POST=sending data
            headers: {
                "Content-Type": "application/json" //I'am sending json data
            },
            body: JSON.stringify({username, password}) //converts js object to json string, this becomes{"username":"..." ,"password":"..." }
           }
        );
        
        //convert in json
        const data = await response.json();
        

    //if response is ok,alert,
        if(response.ok){ 
            alert("Login successful!");
            const username = data.user.username;
            localStorage.setItem("username", username);
            window.location.href = "/dashboard";
        }else{
            alert( "Login failed");
        }

    } catch (error) {
        console.error("Error logging in user:", error);
    }
  }

  return (
    <div className="container-main">
      <div className="card">
        <div className="text-center">
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Sign in to your account to continue</p>
        </div>

        <form>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={login} type="button" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
            Don't have an account? <a href="/signup" className="text-link">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
