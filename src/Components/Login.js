import React, { useState } from "react"; 

const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");

    async function handleClick(){
      setError("");
        fetch('https://dummyjson.com/auth/login', 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username:email,
            password:password,
        })
        })
        .then(res => res.json())
        .then(data=> {
            if (data.id===undefined) {
                setError(data.message);
            }else {
                console.log(data);
                setEmail("");
                setPassword("");
            localStorage.setItem("loggedUser", JSON.stringify(data));
            window.location.href = '/Profile';
            }
        })
        .catch(err => console.log('Error during login:', err));      
    }

  return (
    <div className="main-container">
      <div className="container">
        <div className="header">
          <span>Welcome back!</span>
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
      <div className="signUp">
        <p>Don't have an account?</p>
        <button>Sign up</button>
      </div>
    </div>
  );
};

export default Login;
