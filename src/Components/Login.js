import React, { useState } from "react"; 

const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");

    const handleClick = async () => {
      setError("");
      try {
        const response = await fetch('https://dummyjson.com/auth/login',  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username:email,password:password})
        });
  
        if (response.ok) {
          const data = await response.json();
          setEmail("");
          setPassword("");
          localStorage.setItem("loggedUser", JSON.stringify(data));
          window.location.href = '/Profile';
          
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };


  return (
    <div>
    <div className="main-container">
      <div className="container">
        <div className="header">
          <img src="/image/welcome.png" alt="welcome Back!" />
          <h2>Sign in to your account</h2>
        </div>
        <div className="inputs">
          <div className="inp">
            <label htmlFor="email">Your email</label>
            <input id="email" type="text" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="inp">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        <button className="btn" onClick={handleClick}>CONTINUE</button>
        <p>Forget your password?</p>
        {error && <p id="error">{error}</p>} 
      </div>
    </div>
    <div className="signUp">
    <p>Don't have an account?</p>
    <button>Sign up</button>
  </div>
  </div>
  );
};

export default Login;
