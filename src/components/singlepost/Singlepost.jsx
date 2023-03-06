import "./singlepost.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Singlepost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://weblogapi.onrender.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("https://weblogapi.onrender.com/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  // DELETE THE POST------------------->
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://weblogapi.onrender.com/api/posts/${post._id}`,
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/");
    } catch (err) {}
  };
  // UPDATE THE POST------------------>
  const handleUpdate = async () => {
    try {
      await axios.put(`https://weblogapi.onrender.com/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img
            src="https://i.pinimg.com/550x/fa/fe/e4/fafee42f6e0648d7bb63b99a8623fa2c.jpg"
            alt=""
            className="singlepostimg"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlepostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlepostedit">
                <EditOutlinedIcon
                  className="singleposticon"
                  onClick={() => setUpdateMode(true)}
                ></EditOutlinedIcon>
                <DeleteOutlinedIcon
                  className="singleposticon"
                  onClick={handleDelete}
                ></DeleteOutlinedIcon>
              </div>
            )}
          </h1>
        )}
        ;
        <div className="singlepostinfo">
          <span className="singlepostauthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlepostdate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepostdescinput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlepostdesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlepostbutton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
