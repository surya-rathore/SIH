import React, { useState } from 'react';
import './userSignup.css';
import axios from 'axios';

const UserSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [isSignUpMode, setSignUpMode] = useState(false);  // Manage mode

  const handleRegisterClick = () => {
    setSignUpMode(true);
  };

  const handleLoginClick = () => {
    setSignUpMode(false);  // Switch back to sign in
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== conPassword) {
        alert("Passwords do not match!");
        return;
    }

    const Userdata = { 
        name, 
        email, 
        password, 
        conPassword 
    };

    // Send POST request to the server
    axios.post('http://localhost:4011/userSignup', Userdata)
        .then(response => {
            console.log(response.data); 
        })
        .catch(error => {
            console.error("There was an error creating the account!", error);
        });
  };

  return (
    <div className={`container ${isSignUpMode ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1 className="sign">Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icons"><i className='bx bxl-google'></i></a>
            <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
            <a href="#" className="icons"><i className='bx bxl-github'></i></a>
            <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
          </div>
          <span>Register with E-mail</span>
          <input 
            type="text" 
            name='name' 
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" 
            name='email' 
            placeholder="Enter E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            name='password' 
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" 
            name='conPassword' 
            placeholder="Confirm Password"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1 className="sign">Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icons"><i className='bx bxl-google'></i></a>
            <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
            <a href="#" className="icons"><i className='bx bxl-github'></i></a>
            <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
          </div>
          <span>Login With Email & Password</span>
          <input 
            type="email" 
            name='email' 
            placeholder="Enter E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            name='password' 
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forget Password?</a>
          <button type="button" onClick={handleSubmit}>Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome To <br /> Astronix</h1>
            <p>Sign in With ID & Password</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hey there!</h1>
            <p>"Glad to see you again! Let's get started"</p>
            <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
