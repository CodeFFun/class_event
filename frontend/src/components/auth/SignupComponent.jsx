import React from "react";
import "../../lib/Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <h1>WELCOME!!</h1>
      <h2>SIGN UP TO EVENTHUB</h2>
      <form>
        <input type="text" id="first-name" placeholder="First Name" required />
        <input type="text" id="last-name" placeholder="Last Name" required />
        <input type="email" id="email" placeholder="Enter Your Email" required />
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
          required
        />
        <input
          type="tel"
          id="phone-number"
          placeholder="Phone Number"
          required
        />

        <div className="terms">
          <input type="checkbox" required />
          <label>
            I Agree To The <span><a href="#">Terms</a>, <a href="#">Privacy Policy</a>,
            And <a href="#">Fees</a></span>
          </label>
        </div>
        <button type="submit">SIGN UP</button>
      </form>
      <p>
        Already have an account? <a href="login.html">Login</a>
      </p>
      <div className="divider"></div>
      <div className="social-icons">
        <a href="#">F</a>
        <a href="#">T</a>
        <a href="#">G</a>
      </div>
    </div>
  );
};

export default Signup;
