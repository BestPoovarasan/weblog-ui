import "./register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      setloading(true);
      const res = await axios.post(
        "https://weblogapi.onrender.com/api/authen/register",
        {
          username,
          email,
          password,
        }
      );
      res.data && navigate("/login");
      setloading(false);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registertitle">Register</span>
      <form className="registerform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerinput"
          placeholder="Enter your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerinput"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerinput"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {
          loading ? <button className="registerbutton">Loading..</button> :
          <button type="submit" className="registerbutton">
          Register
        </button>
        }
       
      </form>
      <button className="registerloginbutton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
