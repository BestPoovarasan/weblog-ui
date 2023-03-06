import "./post.css";
import { Link } from "react-router-dom";

export default function Post({post}) {
  const PF = "https://weblogapi.onrender.com/images/";

  return (
    <div className='post'>
        {post.photo && <img className="postimg" src="https://i.pinimg.com/550x/fa/fe/e4/fafee42f6e0648d7bb63b99a8623fa2c.jpg" alt="" />}
        <div className="postinfo">
            <div className="postcata">
            {post.categories.map((c) => (
            <span className="postcat">{c.name}</span>
          ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
          <span className="posttitle">{post.title}</span>
        </Link>
            <hr/>
            <span className="postdate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postdesc">{post.desc}</p>
    </div>
  )
}
