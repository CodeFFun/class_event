import {useState} from "react";
import "../../lib/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({})
  const[privacy, setPrivacy] = useState(false)

const onSubmit = async(e) => {
  e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
}

  const changePrivacy = () =>{
    setPrivacy(prevPrivacy => !prevPrivacy)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  return (
    <div className="signup-container">
      <h1>WELCOME!!</h1>
      <h2>SIGN UP TO EVENTHUB</h2>
      <form onSubmit={onSubmit}>
        <input type="text" id="name" placeholder="John Doe" required onChange={handleChange}/>
        <input type="email" id="email" placeholder="youremail@gmail.com" required onChange={handleChange}/>
        <input
          type="password"
          id="password"
          placeholder="********"
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          id="contact"
          placeholder="+977-0000000000"
          required
          onChange={handleChange}
        />

        <div className="terms">
          <input type="checkbox" required onClick={changePrivacy}/>
          <label>
            I Agree To The <span><a href="#">Terms</a>, <a href="#">Privacy Policy</a>,
            And <a href="#">Fees</a></span>
          </label>
        </div>
        <button  type="submit" disabled={!privacy}>SIGN UP</button>
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
