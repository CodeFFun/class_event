import { useState } from "react";
import "../../lib/Login.css"; 

const LoginComponent = () => {
  const [formData, setFormData] = useState({})

  const onSubmit = async(e) => {
    e.preventDefault()
      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        })
        const data = await response.json()
        console.log(data.data.user_id, data.data.user_role)
        localStorage.setItem('authToken', data.data.user_id)
          localStorage.setItem('role', data.data.user_role)
        
      } catch (error) {
        console.log(error)
      }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  
  return (
    <div className="login-container">
      <h1>HELLO!!</h1>
      <h2>WELCOME TO EVENTHUB</h2>
      <form onSubmit={onSubmit}>
        <input type="email" id="email" placeholder="Enter Your Email" required  onChange={handleChange}/>
        <input type="password" id="password" placeholder="Password" required onChange={handleChange} />
        <div className="options">
          <label>
            <input type="checkbox" /> Remember
          </label>
          <a href="#">Forget Password</a>
        </div>
        <button type="submit">LOG IN</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign up now</a>
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
