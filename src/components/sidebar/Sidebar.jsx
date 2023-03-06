import "./sidebar.css";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://weblogapi.onrender.com/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className='sidebar'> 
      <div className="sidebaritem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
        {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarlistitem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">FOLLOW US</span>
        <FacebookOutlinedIcon className="facebookicon"></FacebookOutlinedIcon>
       
      </div>
    </div>
  )
}
