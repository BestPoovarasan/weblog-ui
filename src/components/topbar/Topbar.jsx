import "./topbar.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
        <div className="topleft"><Link to="/" className="link">WeBlog</Link></div>
        <div className="topcenter">
            <ul className="toplist">
                <li className="toplistitem"><Link to="/" className="link">Home</Link></li>
                <li className="toplistitem"><Link to="/write" className="link">Write</Link></li>
                <li className="toplistitem"><Link to="/contact" className="link">contact</Link></li>
                <li className="toplistitem"><Link to="/about" className="link">About</Link></li>
                <li className="toplistitem" onClick={handleLogout} >{user && "Logout"}</li>
            </ul>
        </div>
        <div className="topright">
        {user ? (
          <Link to="/settings" className="link">
           <SettingsOutlinedIcon></SettingsOutlinedIcon>
          </Link>
        ) : (
          <ul className="toplist">
            <li className="toplistitem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="toplistitem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
           
            <SearchOutlinedIcon className="topsearchicon"></SearchOutlinedIcon>
        </div>
    </div>
  )
}
