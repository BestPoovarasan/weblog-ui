import "./write.css";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://weblogapi.onrender.com/api/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axios.post(
        "https://weblogapi.onrender.com/api/posts",
        newPost
      );
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeimg"
          src="https://i.pinimg.com/550x/fa/fe/e4/fafee42f6e0648d7bb63b99a8623fa2c.jpg"
        />
      )}

      <form onSubmit={handleSubmit} className="writeform">
        <div className="writeformgroup">
          <label htmlFor="fileinput">
            <UploadFileOutlinedIcon className="writeicon"></UploadFileOutlinedIcon>
          </label>
          <input
            type="file"
            id="fileinput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeinput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeformgroup">
          <textarea
            type="text"
            className="writeinput writetext"
            placeholder="Tell Your Story"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writesubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
