import "./login.css"
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";


export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [loading, setloading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      setloading(true);
      const res = await axios.post("https://weblogapi.onrender.com/api/authen/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setloading(false);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
        <span className="logintitle">Login</span>
        <form className="loginform" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="logininput" placeholder="Enter your Username" ref={userRef} />
            <label>Password</label>
            <input type="password" className="logininput" placeholder="Enter your Password" ref={passwordRef} />
            {
              loading ? <button className="loginbutton">Loading..</button> :
              <button className="loginbutton" type="submit" disabled={isFetching} >Login</button>
            }

            
        </form>
            <button className="loginregisterbutton"><Link to="/register" className="link">Register</Link></button>

    </div>
  )
}
