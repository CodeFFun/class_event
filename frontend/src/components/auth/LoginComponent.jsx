import React from "react";
import "../../lib/Login.css"; 

const LoginComponent = () => {
  return (
    <div className="login-container">
      <h1>HELLO!!</h1>
      <h2>WELCOME TO EVENTHUB</h2>
      <form>
        <input type="email" placeholder="Enter Your Email" required />
        <input type="password" placeholder="Password" required />
        <div className="options">
          <label>
            <input type="checkbox" /> Remember
          </label>
          <a href="#">Forget Password</a>
        </div>
        <button type="submit">LOG IN</button>
      </form>
      <p>
        Don’t have an account? <a href="signup.html">Sign up now</a>
      </p>
      <div className="divider"></div>
      <div className="social-icons">
        <a href="#">FB</a>
        <a href="#">TW</a>
        <a href="#">GM</a>
      </div>
    </div>
  );
};

export default LoginComponent;
