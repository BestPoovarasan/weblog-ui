import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://weblogapi.onrender.com/api/posts/" + search);
      console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        
      </div>
    </>
  );
}
